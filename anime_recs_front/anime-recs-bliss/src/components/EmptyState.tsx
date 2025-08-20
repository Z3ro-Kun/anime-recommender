import { Search, Tv } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-slide-up">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center animate-float">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
            <Tv className="w-12 h-12 text-primary" />
          </div>
        </div>
        <Search className="w-8 h-8 text-accent absolute -bottom-2 -right-2 bg-background rounded-full p-2 shadow-lg border border-accent/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-20 animate-pulse"></div>
      </div>
      <div className="text-center space-y-4 max-w-lg">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🎌 Ready to Discover?
        </h3>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Enter your AniList username above to get personalized anime recommendations based on your viewing history and preferences!
        </p>
        <div className="flex justify-center items-center space-x-2 mt-6 text-sm text-muted-foreground">
          <span>✨</span>
          <span>AI-Powered Recommendations</span>
          <span>•</span>
          <span>Personalized for You</span>
          <span>•</span>
          <span>Discover Hidden Gems</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};