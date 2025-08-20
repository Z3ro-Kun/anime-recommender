import aiohttp
import asyncio
import re

ANILIST_URL = "https://graphql.anilist.co"

# --- Title normalization (for filtering sequels/seasons) ---
def normalize_title(title: str) -> str:
    """Normalize titles by removing season numbers and punctuation."""
    if not title:
        return ""
    t = title.lower()
    t = re.sub(r'(\s*season\s*\d+|\s*s\d+|\s*part\s*\d+|final season)', '', t)
    t = re.split(r'[:\-–]', t)[0]
    return t.strip()

# --- User completed list ---
async def fetch_user_completed_list(username: str, min_score: int = 75):
    query = """
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          name
          entries {
            score
            media {
              id
              title { romaji english }
              genres
              tags { name rank }
              coverImage { extraLarge }
            }
          }
        }
      }
    }
    """
    variables = {"name": username}
    async with aiohttp.ClientSession() as session:
        async with session.post(ANILIST_URL, json={"query": query, "variables": variables}) as resp:
            data = await resp.json()
            entries = []
            for lst in data.get("data", {}).get("MediaListCollection", {}).get("lists", []):
                if lst["name"].lower() != "completed":
                    continue
                for e in lst.get("entries", []):
                    score = e.get("score")
                    if score is None: continue
                    if score <= 10: score *= 10
                    if score >= min_score:
                        media = e["media"]
                        entries.append({
                            "id": media["id"],
                            "title_romaji": media["title"]["romaji"],
                            "title_english": media["title"]["english"],
                            "genres": media["genres"],
                            "tags": [t["name"] for t in media["tags"] if t["rank"] > 40],
                            "coverImage": media.get("coverImage") # CORRECTED: Pass the whole object
                        })
            return entries

# --- All user anime (watched, dropped, etc.) ---
async def fetch_user_all_list(username: str):
    query = """
    query ($name: String) {
      MediaListCollection(userName: $name, type: ANIME) {
        lists {
          entries {
            media { id title { romaji } }
          }
        }
      }
    }
    """
    variables = {"name": username}
    async with aiohttp.ClientSession() as session:
        async with session.post(ANILIST_URL, json={"query": query, "variables": variables}) as resp:
            data = await resp.json()
            ids = set()
            titles = set()
            for lst in data.get("data", {}).get("MediaListCollection", {}).get("lists", []):
                for e in lst.get("entries", []):
                    ids.add(e["media"]["id"])
                    titles.add(normalize_title(e["media"]["title"]["romaji"]))
            return ids, titles

# --- Direct recommendations ---
async def fetch_recommendations(session, anime):
    query = """
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        recommendations(perPage: 20) {
          nodes {
            mediaRecommendation {
              id
              title { romaji english }
              genres
              tags { name rank }
              coverImage { extraLarge }
            }
          }
        }
      }
    }
    """
    variables = {"id": anime["id"]}
    try:
        async with session.post(ANILIST_URL, json={"query": query, "variables": variables}) as resp:
            data = await resp.json()
            nodes = data.get("data", {}).get("Media", {}).get("recommendations", {}).get("nodes", [])
            recs = []
            for n in nodes:
                media = n.get("mediaRecommendation")
                if media:
                    recs.append({
                        "id": media["id"],
                        "title_romaji": media["title"]["romaji"],
                        "title_english": media["title"]["english"],
                        "genres": media["genres"],
                        "tags": [t["name"] for t in media["tags"] if t["rank"] > 40],
                        "coverImage": media.get("coverImage") # CORRECTED: Pass the whole object
                    })
            return recs
    except Exception:
        return []

# --- Genre recs ---
async def fetch_by_genre(session, genre, per_genre=100):
    query = """
    query ($genre: String, $perPage: Int) {
      Page(perPage: $perPage) {
        media(genre: $genre, type: ANIME, sort: [SCORE_DESC, POPULARITY_DESC]) {
          id
          title { romaji english }
          genres
          tags { name rank }
          coverImage { extraLarge }
        }
      }
    }
    """
    variables = {"genre": genre, "perPage": per_genre}
    try:
        async with session.post(ANILIST_URL, json={"query": query, "variables": variables}) as resp:
            data = await resp.json()
            return [
                {
                    "id": m["id"],
                    "title_romaji": m["title"]["romaji"],
                    "title_english": m["title"]["english"],
                    "genres": m["genres"],
                    "tags": [t["name"] for t in m["tags"] if t["rank"] > 40],
                    "coverImage": m.get("coverImage") # CORRECTED: Pass the whole object
                }
                for m in data.get("data", {}).get("Page", {}).get("media", [])
            ]
    except Exception:
        return []

# --- Hybrid with similarity ---
async def get_hybrid_recommendations(username: str, min_score: int = 75, top_n: int = 15,
                                     direct_weight=3.0, genre_weight=1.0, tag_weight=0.5, sim_weight=2.0):
    liked = await fetch_user_completed_list(username, min_score)
    if not liked:
        return []

    user_anime_ids, user_titles = await fetch_user_all_list(username)
    all_genres = set(g for a in liked for g in a["genres"])
    all_tags = set(t for a in liked for t in a["tags"])

    candidates = {}

    async with aiohttp.ClientSession() as session:
        tasks = [fetch_recommendations(session, anime) for anime in liked]
        results = await asyncio.gather(*tasks)
        for rec_list in results:
            for rec in rec_list:
                if rec["id"] in user_anime_ids or normalize_title(rec["title_romaji"]) in user_titles:
                    continue
                if rec["id"] not in candidates:
                    candidates[rec["id"]] = {**rec, "score": 0, "direct_count": 0, "genre_count": 0, "tag_count": 0, "sim_score": 0}
                candidates[rec["id"]]["score"] += direct_weight
                candidates[rec["id"]]["direct_count"] += 1

        tasks = [fetch_by_genre(session, genre) for genre in all_genres]
        genre_results = await asyncio.gather(*tasks)
        for rec_list in genre_results:
            for rec in rec_list:
                if rec["id"] in user_anime_ids or normalize_title(rec["title_romaji"]) in user_titles:
                    continue
                if rec["id"] not in candidates:
                    candidates[rec["id"]] = {**rec, "score": 0, "direct_count": 0, "genre_count": 0, "tag_count": 0, "sim_score": 0}
                genre_overlap = len(set(rec["genres"]) & all_genres)
                tag_overlap = len(set(rec["tags"]) & all_tags)
                candidates[rec["id"]]["score"] += genre_weight * genre_overlap + tag_weight * tag_overlap
                candidates[rec["id"]]["genre_count"] += genre_overlap
                candidates[rec["id"]]["tag_count"] += tag_overlap

        for rec in candidates.values():
            rec_genres, rec_tags = set(rec["genres"]), set(rec["tags"])
            sim_total = 0
            for liked_anime in liked:
                lg, lt = set(liked_anime["genres"]), set(liked_anime["tags"])
                inter = len((rec_genres | rec_tags) & (lg | lt))
                union = len((rec_genres | rec_tags) | (lg | lt)) or 1
                sim_total += inter / union
            sim_score = sim_total / len(liked) if liked else 0
            rec["score"] += sim_weight * sim_score
            rec["sim_score"] = round(sim_score, 3)

    ranked = sorted(candidates.values(), key=lambda x: x["score"], reverse=True)
    return ranked[:top_n]

# --- Public wrapper used by FastAPI endpoint ---
async def get_recommendations(username: str, min_score: int = 75, top_n: int = 15):
    try:
        recs = await get_hybrid_recommendations(
            username,
            min_score=min_score,
            top_n=top_n
        )
        return recs
    except Exception as e:
        raise e
