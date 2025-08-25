import { SortToggle } from "./SortToggle";
import { StatusFilter } from "./StatusFilter";
import { FavoriteFilter } from "./FavoriteFilter";
import { ResetFilters } from "./ResetFilters";
import { SearchBar } from "./SearchBar";
import { useFilterLogic } from "./hooks/useFilterLogic";
import type { FilterBarProps } from "./types";

export function FilterBar({
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
  const { hasActiveFilters, resetAllFilters } = useFilterLogic();

  const handleReset = () => {
    resetAllFilters(onStatusFilter, onFavoriteFilter, onSearchChange);
  };

  const isFiltersActive = hasActiveFilters({
    currentSort,
    currentStatusFilter,
    showFavoritesOnly,
    searchQuery,
  });

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 bg-muted/30 rounded-lg border">
      {/* Filter buttons - Desktop only */}
      <div className="hidden sm:flex flex-wrap items-center gap-3">
        <SortToggle currentSort={currentSort} onSortChange={onSortChange} />

        <StatusFilter
          currentStatusFilter={currentStatusFilter}
          onStatusFilter={onStatusFilter}
        />

        <FavoriteFilter
          showFavoritesOnly={showFavoritesOnly}
          favoriteCount={favoriteCount}
          onFavoriteFilter={onFavoriteFilter}
        />

        <ResetFilters
          hasActiveFilters={isFiltersActive}
          onReset={handleReset}
        />
      </div>

      {/* Search bar - Full width */}
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
