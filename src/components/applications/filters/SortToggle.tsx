import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

interface SortToggleProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

export function SortToggle({ currentSort, onSortChange }: SortToggleProps) {
  const handleToggle = () => {
    const newSort =
      currentSort === "company-asc" ? "company-desc" : "company-asc";
    onSortChange(newSort);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={handleToggle}
        className={`h-9 px-3 ${
          currentSort.includes("company")
            ? "bg-slate-50 text-slate-700 hover:bg-slate-100 dark:bg-slate-900/20 dark:text-slate-400"
            : "hover:bg-muted text-muted-foreground hover:text-foreground"
        }`}
        title={
          currentSort === "company-asc" ? "Klicka för Ö-A" : "Klicka för A-Ö"
        }
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
  );
}
