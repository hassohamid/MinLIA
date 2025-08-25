import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import type { FormFieldProps } from "../types";

interface DateFieldProps extends FormFieldProps {}

export function DateField({ value, onChange }: DateFieldProps) {
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
        value={value}
        max={new Date().toISOString().split("T")[0]}
        onChange={(e) => onChange("applied_date", e.target.value)}
        className="h-11 border-muted-foreground/20 focus:border-green-500 transition-colors bg-background/50"
        required
      />
    </div>
  );
}
