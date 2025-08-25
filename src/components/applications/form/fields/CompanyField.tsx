import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";
import type { FormFieldProps } from "../types";

export function CompanyField({ value, onChange }: FormFieldProps) {
  return (
    <div className="space-y-3 group">
      <Label
        htmlFor="company"
        className="flex items-center justify-between text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <Building2 size={16} className="text-blue-500" />
          Företagsnamn
        </div>
        <span
          className={`text-xs ${
            value.length > 20 ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {value.length}/25
        </span>
      </Label>
      <div className="relative">
        <Input
          id="company"
          type="text"
          placeholder="t.ex. TechCorp AB"
          value={value}
          onChange={(e) => onChange("company", e.target.value.slice(0, 25))}
          className="pl-4 pr-4 h-11 border-muted-foreground/20 focus:border-blue-500 transition-colors bg-background/50"
          required
          maxLength={25}
        />
      </div>
    </div>
  );
}
