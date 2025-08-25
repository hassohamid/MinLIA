import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

export function DateField() {
  return (
    <div className="space-y-3 group">
      <Label
        htmlFor="applied_date"
        className="flex items-center gap-2 text-sm font-medium"
      >
        <Calendar size={16} className="text-green-500" />
        Ansökningsdatum
      </Label>
      <Input
        id="applied_date"
        type="date"
        name="applied_date"
        max={new Date().toISOString().split("T")[0]}
        className="h-11 border-muted-foreground/20 focus:border-green-500 transition-colors bg-background/50"
        required
      />
    </div>
  );
}
