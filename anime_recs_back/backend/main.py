from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from .anilist_recommender import get_recommendations  # wrapper we add below

app = FastAPI(title="Anime Recommender API")

# CORS so Vite (5173) can call FastAPI (8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.get("/recommend/{username}")
async def recommend(
    username: str,
    min_score: int = Query(75, ge=0, le=100),
    top_n: int = Query(15, ge=1, le=50),
):
    try:
        recs = await get_recommendations(username, min_score=min_score, top_n=top_n)
        return recs
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
