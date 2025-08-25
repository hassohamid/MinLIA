import { Badge } from "@/components/ui/badge";
import { Send, UserCheck, MessageSquare } from "lucide-react";

interface StatusBadgeProps {
  status: "skickat" | "antagen" | "besvarat";
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case "skickat":
      return (
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800 border-yellow-300 font-medium px-3 py-1 shadow-sm"
        >
          <Send size={12} className="mr-1.5" />
          Skickat
        </Badge>
      );
    case "antagen":
      return (
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-green-50 to-green-100 text-green-800 border-green-300 font-medium px-3 py-1 shadow-sm"
        >
          <UserCheck size={12} className="mr-1.5" />
          Antagen
        </Badge>
      );
    case "besvarat":
      return (
        <Badge
          variant="outline"
          className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border-blue-300 font-medium px-3 py-1 shadow-sm"
        >
          <MessageSquare size={12} className="mr-1.5" />
          Besvarat
        </Badge>
      );
  }
}
