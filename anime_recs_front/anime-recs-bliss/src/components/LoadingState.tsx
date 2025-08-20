
import { Sparkles, Loader2 } from "lucide-react";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 animate-slide-up">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-primary/30 to-accent/30 animate-pulse flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-primary" />
        </div>
        <Loader2 className="w-8 h-8 text-accent absolute top-1/3 left-1/3 animate-spin" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-xl opacity-30 animate-pulse"></div>
      </div>
      <div className="text-center space-y-4 max-w-md">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          ✨ Finding Your Perfect Anime
        </h3>
        <p className="text-muted-foreground text-lg">
          Analyzing your taste and discovering new favorites...
        </p>
        <div className="flex justify-center space-x-2 mt-6">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};