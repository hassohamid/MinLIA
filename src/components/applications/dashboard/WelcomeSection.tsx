import { Bookmark, MousePointer2, Heart } from "lucide-react";
import type { User } from "@supabase/supabase-js";

interface WelcomeSectionProps {
  user: User | null;
  authLoading: boolean;
}

export function WelcomeSection({ user, authLoading }: WelcomeSectionProps) {
  return (
    <div className="p-6 mt-10 border-l-4 border-blue-700 rounded-xl relative">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Din LIA-koll<span className="text-green-300">.</span>
      </h1>
      <h2 className="text-muted-foreground font-medium text-[13px] sm:text-sm">
        Samla och följ dina LIA-ansökningar på ett ställe.
      </h2>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 text-blue-600">
          <Bookmark size={18} className="fill-current" />
          <span className="text-sm font-medium">Organiserat & enkelt</span>
        </div>
        <div className="flex items-center gap-2 text-amber-600">
          <MousePointer2 size={18} className="fill-current" />
          <span className="text-sm font-medium">
            {authLoading
              ? "Laddar..."
              : user
              ? "Bättre än Excel eller Word-dokument"
              : "Ett klick för att registrera dig"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-red-500">
          <Heart size={18} className="fill-current" />
          <span className="text-sm font-medium">Markera dina toppval</span>
        </div>
      </div>
    </div>
  );
}
