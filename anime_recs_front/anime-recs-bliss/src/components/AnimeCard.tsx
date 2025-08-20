// src/components/AnimeCard.tsx

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimeRecommendation } from "@/api/anime";
import { AspectRatio } from "./ui/aspect-ratio";

interface AnimeCardProps {
  anime: AnimeRecommendation;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  const displayTitle = anime.title_english || anime.title_romaji;

  return (
    <div className="gradient-border anime-hover group h-full">
      <Card className="gradient-border-content flex flex-col h-full overflow-hidden glass-card border-0">
      {/* Image Section */}
      <AspectRatio ratio={3 / 4} className="overflow-hidden">
        <a
          href={`https://anilist.co/anime/${anime.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block w-full h-full group-hover:scale-105 transition-transform duration-300"
        >
          <img
            src={anime.coverImage?.extraLarge || "/placeholder.svg"}
            alt={`Cover for ${displayTitle}`}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </a>
      </AspectRatio>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-4">
        <CardHeader className="p-0 mb-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CardTitle className="text-base font-bold truncate cursor-default">
                  {displayTitle}
                </CardTitle>
              </TooltipTrigger>
              <TooltipContent>
                <p>{displayTitle}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {anime.title_english && anime.title_english !== anime.title_romaji && (
            <CardDescription className="text-xs truncate">
              {anime.title_romaji}
            </CardDescription>
          )}
        </CardHeader>

        <CardContent className="p-0 flex-grow">
          <div className="flex flex-wrap gap-1">
            {anime.genres.slice(0, 2).map((genre) => (
              <Badge 
                key={genre} 
                variant="secondary" 
                className="text-xs bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 hover:from-primary/30 hover:to-accent/30 transition-all duration-200"
              >
                {genre}
              </Badge>
            )
            )}
          </div>
        </CardContent>

        <CardFooter className="p-0 mt-4">
          <a
            href={`https://anilist.co/anime/${anime.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-200 group-hover:scale-105"
          >
            View on AniList →
          </a>
        </CardFooter>
      </div>
    </Card>
    </div>
  );
}