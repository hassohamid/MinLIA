import { TableCell, TableRow } from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { FavoriteButton } from "./FavoriteButton";
import { ActionMenu } from "./ActionMenu";
import { capitalizeFirst } from "./utils";
import type { Application } from "@/types";

interface ApplicationRowProps {
  application: Application;
  isAnimating: boolean;
  showFloatingHearts: boolean;
  onToggleFavorite: () => void;
  onStatusUpdate: (status: string) => void;
  onDelete: () => void;
}

export function ApplicationRow({
  application,
  isAnimating,
  showFloatingHearts,
  onToggleFavorite,
  onStatusUpdate,
  onDelete,
}: ApplicationRowProps) {
  return (
    <TableRow className="border-b border-border/30 hover:bg-gradient-to-r hover:from-muted/30 hover:to-background transition-all duration-200 group">
      <TableCell className="font-semibold text-foreground py-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          {capitalizeFirst(application.company)}
        </div>
      </TableCell>

      <TableCell className="hidden md:table-cell py-4 text-muted-foreground">
        {capitalizeFirst(application.role)}
      </TableCell>

      <TableCell className="hidden lg:table-cell py-4 text-muted-foreground font-mono text-sm">
        {new Date(application.applied_date).toLocaleDateString("sv-SE")}
      </TableCell>

      <TableCell className="py-4">
        <StatusBadge status={application.status} />
      </TableCell>

      <TableCell className="relative overflow-hidden py-4 hidden sm:table-cell">
        <FavoriteButton
          isFavorite={!!application.is_favorite}
          isAnimating={isAnimating}
          showFloatingHearts={showFloatingHearts}
          onToggle={onToggleFavorite}
        />
      </TableCell>

      <TableCell className="py-4 hidden sm:table-cell">
        <ActionMenu
          currentStatus={application.status}
          onStatusUpdate={onStatusUpdate}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
}
