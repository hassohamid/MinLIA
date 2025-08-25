import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";
import type { FormFieldProps } from "../types";

export function RoleField({ value, onChange }: FormFieldProps) {
  return (
    <div className="space-y-3 group">
      <Label
        htmlFor="role"
        className="flex items-center justify-between text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <User size={16} className="text-purple-500" />
          Roll/Position
        </div>
        <span
          className={`text-xs ${
            value.length > 25 ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          {value.length}/30
        </span>
      </Label>
      <Input
        id="role"
        type="text"
        placeholder="t.ex. Frontend Developer"
        value={value}
        onChange={(e) => onChange("role", e.target.value.slice(0, 30))}
        className="h-11 border-muted-foreground/20 focus:border-purple-500 transition-colors bg-background/50"
        required
        maxLength={30}
      />
    </div>
  );
}
