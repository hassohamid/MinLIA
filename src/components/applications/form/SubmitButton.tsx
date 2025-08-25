import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
  isValid: boolean;
}

export function SubmitButton({ isLoading, isValid }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-lg hover:shadow-xl"
      disabled={!isValid || isLoading}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          Lägger till...
        </div>
      ) : (
        "Lägg till ansökan"
      )}
    </Button>
  );
}
