import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Heart, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./search-bar";

interface FilterBarProps {
  onSortChange: (sort: string) => void;
  onStatusFilter: (status: string) => void;
  onFavoriteFilter: (showFavorites: boolean) => void;
  onSearchChange: (query: string) => void;
  currentSort: string;
  currentStatusFilter: string;
  showFavoritesOnly: boolean;
  favoriteCount: number;
  searchQuery: string;
}

export default function FilterBar({
  onSortChange,
  onStatusFilter,
  onFavoriteFilter,
  onSearchChange,
  currentSort,
  currentStatusFilter,
  showFavoritesOnly,
  favoriteCount,
  searchQuery,
}: FilterBarProps) {
  const hasActiveFilters =
    currentStatusFilter !== "all" || showFavoritesOnly || searchQuery.trim();

  const resetAllFilters = () => {
    onStatusFilter("all");
    onFavoriteFilter(false);
    onSearchChange("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg border">
      {/* Vänster sida - Filter controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sortering */}
        <div className="hidden md:flex items-center gap-2">
          <ArrowUpDown size={14} className="text-muted-foreground" />
          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger className="w-[160px] h-9 border-muted-foreground/20">
              <SelectValue placeholder="Sortera" />
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
          <Filter size={14} className="text-muted-foreground" />
          <Select value={currentStatusFilter} onValueChange={onStatusFilter}>
            <SelectTrigger className="w-[130px] h-9 border-muted-foreground/20">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="skickat">Skickat</SelectItem>
              <SelectItem value="antagen">Antagen</SelectItem>
              <SelectItem value="besvarat">Besvarat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Favoriter toggle */}
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

        {/* Reset filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetAllFilters}
            className="h-9 px-3 text-muted-foreground hover:text-foreground"
          >
            <X size={14} className="mr-1" />
            Rensa
          </Button>
        )}
      </div>

      {/* Höger sida - Sökfält */}
      <div className="w-full sm:w-auto sm:min-w-[300px]">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Sök efter företag eller roll..."
        />
      </div>
    </div>
  );
}
