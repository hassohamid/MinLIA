import { Button } from "@/components/ui/button";
import { Send, UserCheck, MessageSquare, Filter } from "lucide-react";
import type { StatusType } from "./types";

interface StatusFilterProps {
  currentStatusFilter: string;
  onStatusFilter: (status: string) => void;
}

export function StatusFilter({
  currentStatusFilter,
  onStatusFilter,
}: StatusFilterProps) {
  const statusButtons = [
    {
      value: "skickat" as StatusType,
      icon: Send,
      label: "Skickat",
      colors: {
        active:
          "bg-yellow-50 text-yellow-700 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400",
        inactive: "hover:bg-muted text-muted-foreground hover:text-foreground",
      },
    },
    {
      value: "besvarat" as StatusType,
      icon: MessageSquare,
      label: "Besvarat",
      colors: {
        active:
          "bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
        inactive: "hover:bg-muted text-muted-foreground hover:text-foreground",
      },
    },
    {
      value: "antagen" as StatusType,
      icon: UserCheck,
      label: "Antagen",
      colors: {
        active:
          "bg-green-50 text-green-700 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400",
        inactive: "hover:bg-muted text-muted-foreground hover:text-foreground",
      },
    },
  ];

  return (
    <div className="flex items-center gap-2">
      <Filter size={14} className="text-muted-foreground" />
      <div className="flex flex-wrap gap-1">
        {statusButtons.map(({ value, icon: Icon, label, colors }) => (
          <Button
            key={value}
            variant={currentStatusFilter === value ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onStatusFilter(value)}
            className={`h-9 px-3 ${
              currentStatusFilter === value ? colors.active : colors.inactive
            }`}
          >
            <Icon size={14} className="mr-1" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
