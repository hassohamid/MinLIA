import { Button } from "@/components/ui/button";
import { Heart, X, Send, UserCheck, MessageSquare, Filter, ArrowUpDown } from "lucide-react";
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "skickat":
        return Send;
      case "besvarat":
        return MessageSquare;
      case "antagen":
        return UserCheck;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-muted/30 rounded-lg border">
      {/* Filter knappar */}
      <div className="hidden sm:flex flex-wrap items-center gap-3">
        {/* Sortering - Toggle button */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Toggle mellan A-Ö och Ö-A
              const newSort = currentSort === "company-asc" ? "company-desc" : "company-asc";
              onSortChange(newSort);
            }}
            className={`h-9 px-3 ${
              currentSort.includes("company")
                ? "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900/20 dark:text-slate-400"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            }`}
            title={currentSort === "company-asc" ? "Klicka för Ö-A" : "Klicka för A-Ö"}
          >
            <ArrowUpDown 
              size={14} 
              className={`transition-transform duration-200 ${
                currentSort === "company-desc" ? "rotate-180" : ""
              }`} 
            />
            {currentSort.includes("company") && (
              <span className="ml-1 text-xs">
                {currentSort === "company-asc" ? "A-Ö" : "Ö-A"}
              </span>
            )}
          </Button>
        </div>

        {/* Status filter - Icon-based buttons */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-muted-foreground" />
          <div className="flex flex-wrap gap-1">
            {/* Skickat Button */}
            <Button
              variant={
                currentStatusFilter === "skickat" ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() => onStatusFilter("skickat")}
              className={`h-9 px-3 ${
                currentStatusFilter === "skickat"
                  ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Send size={14} className="mr-1" />
              Skickat
            </Button>

            {/* Besvarat Button */}
            <Button
              variant={
                currentStatusFilter === "besvarat" ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() => onStatusFilter("besvarat")}
              className={`h-9 px-3 ${
                currentStatusFilter === "besvarat"
                  ? "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <MessageSquare size={14} className="mr-1" />
              Besvarat
            </Button>

            {/* Antagen Button */}
            <Button
              variant={
                currentStatusFilter === "antagen" ? "secondary" : "ghost"
              }
              size="sm"
              onClick={() => onStatusFilter("antagen")}
              className={`h-9 px-3 ${
                currentStatusFilter === "antagen"
                  ? "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <UserCheck size={14} className="mr-1" />
              Antagen
            </Button>
          </div>
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
            <X size={14} className="lg:mr-1" />
            <span className="hidden lg:inline">Rensa</span>
          </Button>
        )}
      </div>

      {/* Sökfält - egen rad */}
      <div className="w-full">
        <SearchBar
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Sök efter företag eller roll..."
        />
      </div>
    </div>
  );
}
