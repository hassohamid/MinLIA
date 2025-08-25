import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2, User, Calendar } from "lucide-react";
import { ApplicationRow } from "./ApplicationRow";
import type { Application } from "@/types";

interface ApplicationTableProps {
  applications: Application[];
  heartAnimations: { [key: string]: boolean };
  floatingHearts: { [key: string]: boolean };
  onToggleFavorite: (id: number) => void;
  onStatusUpdate: (id: number, status: string) => void;
  onDelete: (application: Application) => void;
}

export function ApplicationTable({
  applications,
  heartAnimations,
  floatingHearts,
  onToggleFavorite,
  onStatusUpdate,
  onDelete,
}: ApplicationTableProps) {
  return (
    <div className="flex-1 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border/50 bg-muted/20">
            <TableHead className="w-[250px] h-12 font-semibold text-foreground/80">
              <div className="flex items-center gap-2">
                <Building2 size={16} className="text-blue-600" />
                Företag
              </div>
            </TableHead>
            <TableHead className="hidden md:table-cell h-12 font-semibold text-foreground/80">
              <div className="flex items-center gap-2">
                <User size={16} className="text-purple-600" />
                Roll
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell h-12 font-semibold text-foreground/80">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-green-500" />
                Ansökningsdatum
              </div>
            </TableHead>
            <TableHead className="h-12 font-semibold text-foreground/80">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-orange-500 rounded-full animate-ping opacity-75"></div>
                </div>
                Status
              </div>
            </TableHead>
            <TableHead className="w-[50px] h-12 hidden sm:table-cell"></TableHead>
            <TableHead className="w-[50px] h-12 hidden sm:table-cell"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <ApplicationRow
              key={application.id}
              application={application}
              isAnimating={
                !!(application.id && heartAnimations[application.id])
              }
              showFloatingHearts={
                !!(application.id && floatingHearts[application.id])
              }
              onToggleFavorite={() =>
                application.id && onToggleFavorite(application.id)
              }
              onStatusUpdate={(status) =>
                application.id && onStatusUpdate(application.id, status)
              }
              onDelete={() => onDelete(application)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
