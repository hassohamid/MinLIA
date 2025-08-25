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
  UserCheck,
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
          <Send size={14} className="text-yellow-600" />
          Markera som skickat
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusUpdate("besvarat")}
          disabled={currentStatus === "besvarat"}
          className="flex items-center gap-2"
        >
          <MessageSquare size={14} className="text-blue-600" />
          Markera som besvarat
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onStatusUpdate("antagen")}
          disabled={currentStatus === "antagen"}
          className="flex items-center gap-2"
        >
          <UserCheck size={14} className="text-green-600" />
          Markera som antagen
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Ta bort */}
        <DropdownMenuItem
          onClick={onDelete}
          className="flex items-center gap-2 text-red-600 focus:text-red-600"
        >
          <Trash2 size={14} />
          Ta bort ansökan
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
