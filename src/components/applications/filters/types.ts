export interface FilterState {
  currentSort: string;
  currentStatusFilter: string;
  showFavoritesOnly: boolean;
  searchQuery: string;
}

export interface FilterActions {
  onSortChange: (sort: string) => void;
  onStatusFilter: (status: string) => void;
  onFavoriteFilter: (showFavorites: boolean) => void;
  onSearchChange: (query: string) => void;
}

export interface FilterBarProps extends FilterState, FilterActions {
  favoriteCount: number;
}

export type StatusType = "skickat" | "besvarat" | "antagen" | "all";
export type SortType =
  | "company-asc"
  | "company-desc"
  | "date-asc"
  | "date-desc";
