// src/api/anime.ts

const API_BASE_URL = "http://127.0.0.1:8000";

// Define the TypeScript type for the anime recommendation object
// This matches the data structure from your Python backend
export interface AnimeRecommendation {
  id: number;
  title_romaji: string;
  title_english: string | null;
  genres: string[];
  tags: string[];
  score: number;
  direct_count: number;
  genre_count: number;
  tag_count: number;
  sim_score: number;
  // The coverImage property, which can be null
  coverImage: {
    extraLarge: string;
  } | null;
}

/**
 * Fetches anime recommendations for a given username from the backend API.
 * @param username - The AniList username to get recommendations for.
 * @param min_score - The minimum score for an anime to be considered.
 * @param top_n - The number of recommendations to return.
 * @returns A promise that resolves to an array of AnimeRecommendation objects.
 */
export const fetchAnimeRecommendations = async (
  username: string,
  min_score: number = 75,
  top_n: number = 15
): Promise<AnimeRecommendation[]> => {
  const url = new URL(`${API_BASE_URL}/recommend/${username}`);
  url.searchParams.append("min_score", min_score.toString());
  url.searchParams.append("top_n", top_n.toString());

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to fetch recommendations");
  }

  const data = await response.json();
  
  // Ensure the backend always returns an array
  if (Array.isArray(data)) {
      return data;
  }

  return [];
};
