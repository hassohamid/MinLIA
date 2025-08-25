import type { FilterState } from "../types";

export function useFilterLogic() {
  const hasActiveFilters = (filters: FilterState): boolean => {
    return (
      filters.currentStatusFilter !== "all" ||
      filters.showFavoritesOnly ||
      filters.searchQuery.trim() !== ""
    );
  };

  const resetAllFilters = (
    onStatusFilter: (status: string) => void,
    onFavoriteFilter: (showFavorites: boolean) => void,
    onSearchChange: (query: string) => void
  ) => {
    onStatusFilter("all");
    onFavoriteFilter(false);
    onSearchChange("");
  };

  const toggleSort = (
    currentSort: string,
    onSortChange: (sort: string) => void
  ) => {
    const newSort =
      currentSort === "company-asc" ? "company-desc" : "company-asc";
    onSortChange(newSort);
  };

  return {
    hasActiveFilters,
    resetAllFilters,
    toggleSort,
  };
}
