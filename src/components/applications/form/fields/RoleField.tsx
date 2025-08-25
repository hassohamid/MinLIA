import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";

export function RoleField() {
  return (
    <div className="space-y-3 group">
      <Label
        htmlFor="role"
        className="flex items-center justify-between text-sm font-medium"
      >
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-purple-500" />
          Roll
        </div>
      </Label>
      <Input
        id="role"
        type="text"
        name="role"
        placeholder="Frontend Developer"
        className="h-11 border-muted-foreground/20 focus:border-purple-500 transition-colors bg-background/50"
        required
        maxLength={30}
      />
    </div>
  );
}
