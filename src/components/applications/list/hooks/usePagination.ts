import { useState, useMemo } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
}

export function usePagination({
  totalItems,
  itemsPerPage = 10,
}: UsePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const paginationInfo = useMemo(
    () => ({
      currentPage,
      totalPages,
      startIndex,
      endIndex,
      hasPrevious: currentPage > 1,
      hasNext: currentPage < totalPages,
    }),
    [currentPage, totalPages, startIndex, endIndex]
  );

  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(validPage);
  };

  const goToPrevious = () => goToPage(currentPage - 1);
  const goToNext = () => goToPage(currentPage + 1);
  const resetPage = () => setCurrentPage(1);

  return {
    ...paginationInfo,
    goToPage,
    goToPrevious,
    goToNext,
    resetPage,
  };
}
