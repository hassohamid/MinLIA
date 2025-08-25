import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";

interface FavoriteFilterProps {
  showFavoritesOnly: boolean;
  favoriteCount: number;
  onFavoriteFilter: (showFavorites: boolean) => void;
}

export function FavoriteFilter({
  showFavoritesOnly,
  favoriteCount,
  onFavoriteFilter,
}: FavoriteFilterProps) {
  return (
    <Button
      variant={showFavoritesOnly ? "secondary" : "ghost"}
      size="sm"
      onClick={() => onFavoriteFilter(!showFavoritesOnly)}
      className={`h-9 px-3 ${
        showFavoritesOnly
          ? "bg-red-50 text-red-700 hover:bg-red-100"
          : "hover:bg-muted"
      }`}
    >
      <Heart
        size={14}
        className={
          showFavoritesOnly
            ? "fill-red-500 text-red-500 mr-1"
            : "text-muted-foreground mr-1"
        }
      />
      {favoriteCount > 0 && (
        <Badge
          variant="secondary"
          className={`text-xs px-1 min-w-[16px] h-4 ${
            showFavoritesOnly
              ? "bg-white text-red-700 dark:bg-red-100 dark:text-red-800"
              : ""
          }`}
        >
          {favoriteCount}
        </Badge>
      )}
    </Button>
  );
}
