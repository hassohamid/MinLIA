import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ResetFiltersProps {
  hasActiveFilters: boolean;
  onReset: () => void;
}

export function ResetFilters({ hasActiveFilters, onReset }: ResetFiltersProps) {
  if (!hasActiveFilters) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onReset}
      className="h-9 px-3 text-muted-foreground hover:text-foreground"
    >
      <X size={14} className="lg:mr-1" />
      <span className="hidden lg:inline">Rensa</span>
    </Button>
  );
}
