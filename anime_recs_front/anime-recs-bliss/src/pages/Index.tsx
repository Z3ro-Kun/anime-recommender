// src/pages/Index.tsx

import { useState } from "react";
import { AnimeCard } from "@/components/AnimeCard";
import { SearchForm } from "@/components/SearchForm";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { fetchAnimeRecommendations, AnimeRecommendation } from "@/api/anime";

export default function Index() {
  const [recommendations, setRecommendations] = useState<AnimeRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  /**
   * Handles the search submission by calling the API.
   * @param username - The username submitted from the form.
   */
  const handleSearch = async (username: string) => {
    if (!username) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setRecommendations([]);

    try {
      const recs = await fetchAnimeRecommendations(username);
      setRecommendations(recs);
    } catch (err: any) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-slide-up">
          <div className="relative inline-block">
            <h1 className="text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
              🎌 Anime Recommender
            </h1>
            <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10 animate-pulse-glow"></div>
          </div>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Discover your next favorite anime with AI-powered recommendations based on your AniList profile
          </p>
        </header>

      <main>
        <SearchForm onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <Alert variant="destructive" className="my-8">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && <LoadingState />}

        {!isLoading && recommendations.length > 0 && (
          <div className="animate-slide-up">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ✨ Recommended For You
              </h2>
              <p className="text-muted-foreground mt-2">
                Found {recommendations.length} amazing anime recommendations
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {recommendations.map((rec, index) => (
                <div 
                  key={rec.id} 
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AnimeCard anime={rec} />
                </div>
              ))}
            </div>
          </div>
        )}

        {!isLoading && hasSearched && recommendations.length === 0 && !error && (
          <EmptyState />
        )}
      </main>
      </div>
    </div>
  );
}