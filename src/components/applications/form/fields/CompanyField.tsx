import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2 } from "lucide-react";

export function CompanyField() {
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
      </Label>
      <div className="relative">
        <Input
          id="company"
          type="text"
          name="company"
          placeholder="t.ex. TechCorp AB"
          className="pl-4 pr-4 h-11 border-muted-foreground/20 focus:border-blue-500 transition-colors bg-background/50"
          required
          maxLength={25}
        />
      </div>
    </div>
  );
}
