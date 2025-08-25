import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Send,
  MessageSquare,
  UserRoundCheck,
  Trash2,
} from "lucide-react";

interface ActionMenuProps {
  currentStatus: string;
  onStatusUpdate: (status: string) => void;
  onDelete: () => void;
}

export function ActionMenu({
  currentStatus,
  onStatusUpdate,
  onDelete,
}: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-full hover:bg-muted/60 transition-all duration-200"
        >
          <MoreHorizontal size={16} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 border border-border/50 shadow-lg"
      >
        <DropdownMenuLabel>Åtgärder</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Status ändringar */}
        <DropdownMenuItem
          onClick={() => onStatusUpdate("skickat")}
          disabled={currentStatus === "skickat"}
          className="flex items-center gap-2"
        >
          <Send size={14} className="text-yellow-300" />
          Markera som Skickat
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusUpdate("besvarat")}
          disabled={currentStatus === "besvarat"}
          className="flex items-center gap-2"
        >
          <MessageSquare size={14} className="text-blue-600" />
          Markera som Besvarat
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusUpdate("antagen")}
          disabled={currentStatus === "antagen"}
          className="flex items-center gap-2"
        >
          <UserRoundCheck size={14} className="text-green-600" />
          Markera som Antagen
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Ta bort */}
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center gap-2 text-destructive focus:text-destructive"
        >
          <Trash2 size={14} />
          Ta bort ansökan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
