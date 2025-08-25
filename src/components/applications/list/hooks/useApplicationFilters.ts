import { useState, useMemo } from "react";
import type { Application } from "../../types";

interface UseApplicationFiltersProps {
  applications: Application[];
}

export function useApplicationFilters({
  applications,
}: UseApplicationFiltersProps) {
  const [sortBy, setSortBy] = useState("company-asc");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort applications
  const filteredAndSortedApplications = useMemo(() => {
    let filtered = [...applications];

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (app) =>
          app.company.toLowerCase().includes(query) ||
          app.role.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Filter by favorites
    if (showFavoritesOnly) {
      filtered = filtered.filter((app) => app.is_favorite);
    }

    // Sort applications
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "company-asc":
          return a.company.localeCompare(b.company);
        case "company-desc":
          return b.company.localeCompare(a.company);
        case "date-desc":
          return (
            new Date(b.applied_date).getTime() -
            new Date(a.applied_date).getTime()
          );
        case "date-asc":
          return (
            new Date(a.applied_date).getTime() -
            new Date(b.applied_date).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [applications, sortBy, statusFilter, showFavoritesOnly, searchQuery]);

  const favoriteCount = applications.filter(
    (app: Application) => app.is_favorite
  ).length;

  return {
    // State
    sortBy,
    statusFilter,
    showFavoritesOnly,
    searchQuery,

    // Computed
    filteredAndSortedApplications,
    favoriteCount,

    // Actions
    setSortBy,
    setStatusFilter,
    setShowFavoritesOnly,
    setSearchQuery,
  };
}
