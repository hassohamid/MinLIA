"use client";
import { Card, CardContent } from "@/components/ui/card";
import FilterBar from "../filter-bar";
import { ApplicationTable } from "./ApplicationTable";
import { DeleteDialog } from "./DeleteDialog";
import { EmptyState } from "./EmptyState";
import { ApplicationPagination } from "./ApplicationPagination";
import { ApplicationListHeader } from "./ApplicationListHeader";
import { useApplicationFilters } from "./hooks/useApplicationFilters";
import { usePagination } from "./hooks/usePagination";
import { useHeartAnimations } from "./hooks/useHeartAnimations";
import { useApplicationActions } from "./hooks/useApplicationActions";
import type { Application } from "../types";

interface ApplicationListProps {
  applications: Application[];
}

export default function ApplicationList({
  applications,
}: ApplicationListProps) {
  // Custom hooks for state management
  const filters = useApplicationFilters({ applications });
  const pagination = usePagination({
    totalItems: filters.filteredAndSortedApplications.length,
  });
  const heartAnimations = useHeartAnimations();
  const actions = useApplicationActions({
    applications,
    onHeartAnimation: heartAnimations.triggerHeartAnimation,
  });

  // Get current page applications
  const currentApplications = filters.filteredAndSortedApplications.slice(
    pagination.startIndex,
    pagination.endIndex
  );

  // Filter change handlers (reset page)
  const handleSortChange = (sort: string) => {
    filters.setSortBy(sort);
    pagination.resetPage();
  };

  const handleStatusFilter = (status: string) => {
    filters.setStatusFilter(status);
    pagination.resetPage();
  };

  const handleFavoriteFilter = (showFavorites: boolean) => {
    filters.setShowFavoritesOnly(showFavorites);
    pagination.resetPage();
  };

  const handleSearchChange = (query: string) => {
    filters.setSearchQuery(query);
    pagination.resetPage();
  };

  // Empty states
  if (applications.length === 0) {
    return <EmptyState type="no-applications" />;
  }

  if (filters.filteredAndSortedApplications.length === 0) {
    return (
      <Card className="mb-10 h-[900px] md:h-[700px] lg:h-[750px] flex flex-col">
        <ApplicationListHeader count={applications.length} />
        <CardContent className="flex-1 flex flex-col">
          <FilterBar
            onSortChange={handleSortChange}
            onStatusFilter={handleStatusFilter}
            onFavoriteFilter={handleFavoriteFilter}
            onSearchChange={handleSearchChange}
            currentSort={filters.sortBy}
            currentStatusFilter={filters.statusFilter}
            showFavoritesOnly={filters.showFavoritesOnly}
            favoriteCount={filters.favoriteCount}
            searchQuery={filters.searchQuery}
          />
          <EmptyState type="no-results" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-10 h-[960px] sm:h-[1050px] flex flex-col">
        <ApplicationListHeader
          count={filters.filteredAndSortedApplications.length}
        />

        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <FilterBar
            onSortChange={handleSortChange}
            onStatusFilter={handleStatusFilter}
            onFavoriteFilter={handleFavoriteFilter}
            onSearchChange={handleSearchChange}
            currentSort={filters.sortBy}
            currentStatusFilter={filters.statusFilter}
            showFavoritesOnly={filters.showFavoritesOnly}
            favoriteCount={filters.favoriteCount}
            searchQuery={filters.searchQuery}
          />

          <ApplicationTable
            applications={currentApplications}
            heartAnimations={heartAnimations.heartAnimations}
            floatingHearts={heartAnimations.floatingHearts}
            onToggleFavorite={actions.toggleFavorite}
            onStatusUpdate={actions.updateStatus}
            onDelete={actions.handleDeleteClick}
          />

          <ApplicationPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            onPrevious={pagination.goToPrevious}
            onNext={pagination.goToNext}
            hasPrevious={pagination.hasPrevious}
            hasNext={pagination.hasNext}
          />
        </CardContent>
      </Card>

      <DeleteDialog
        isOpen={actions.deleteDialogOpen}
        application={actions.applicationToDelete}
        onConfirm={actions.confirmDelete}
        onCancel={actions.cancelDelete}
      />
    </>
  );
}
