import { CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface ApplicationListHeaderProps {
  count: number;
}

export function ApplicationListHeader({ count }: ApplicationListHeaderProps) {
  return (
    <CardHeader className="flex-shrink-0">
      <CardTitle className="flex items-center gap-2">
        <Building2 size={20} />
        Dina ansökningar ({count})
      </CardTitle>
    </CardHeader>
  );
}
