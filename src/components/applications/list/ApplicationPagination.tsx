import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ApplicationPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}

export function ApplicationPagination({
  currentPage,
  totalPages,
  onPageChange,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}: ApplicationPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-auto pt-6 flex-shrink-0 border-t border-border/30">
      <div className="flex items-center justify-center">
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={onPrevious}
                className={`transition-all duration-200 ${
                  !hasPrevious
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer hover:bg-muted hover:text-foreground"
                }`}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className={`cursor-pointer transition-all duration-200 ${
                    currentPage === page
                      ? "bg-foreground text-white shadow-sm scale-105 hover:bg-foreground/90"
                      : "hover:bg-muted hover:text-foreground hover:scale-105"
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={onNext}
                className={`transition-all duration-200 ${
                  !hasNext
                    ? "pointer-events-none opacity-40"
                    : "cursor-pointer hover:bg-muted hover:text-foreground"
                }`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
