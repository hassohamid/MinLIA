import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpDown, Heart, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FilterBarProps {
  onSortChange: (sort: string) => void;
  onStatusFilter: (status: string) => void;
  onFavoriteFilter: (showFavorites: boolean) => void;
  currentSort: string;
  currentStatusFilter: string;
  showFavoritesOnly: boolean;
  favoriteCount: number;
}

export default function FilterBar({
  onSortChange,
  onStatusFilter,
  onFavoriteFilter,
  currentSort,
  currentStatusFilter,
  showFavoritesOnly,
  favoriteCount,
}: FilterBarProps) {
  return (
    <Card className="mb-6">
      <CardContent className="py-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Sortering */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={16} className="text-muted-foreground" />
            <Select value={currentSort} onValueChange={onSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sortera efter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company-asc">Företag A-Ö</SelectItem>
                <SelectItem value="company-desc">Företag Ö-A</SelectItem>
                <SelectItem value="date-desc">Senaste datum</SelectItem>
                <SelectItem value="date-asc">Äldsta datum</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <Select value={currentStatusFilter} onValueChange={onStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filtrera status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alla status</SelectItem>
                <SelectItem value="sökande">Sökande</SelectItem>
                <SelectItem value="antagen">Antagen</SelectItem>
                <SelectItem value="besvarat">Besvarat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Favoriter knapp */}
          <Button
            variant={showFavoritesOnly ? "default" : "outline"}
            onClick={() => onFavoriteFilter(!showFavoritesOnly)}
            className="flex items-center gap-2"
          >
            <Heart
              size={16}
              className={
                showFavoritesOnly ? "fill-white text-white" : "text-red-500"
              }
            />
            Favoriter
            {favoriteCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {favoriteCount}
              </Badge>
            )}
          </Button>

          {/* Reset filters */}
          {(currentStatusFilter !== "all" || showFavoritesOnly) && (
            <Button
              variant="ghost"
              onClick={() => {
                onStatusFilter("all");
                onFavoriteFilter(false);
              }}
              className="text-muted-foreground"
            >
              Rensa filter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
