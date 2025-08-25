import { Card, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface EmptyStateProps {
  type: "no-applications" | "no-results";
}

export function EmptyState({ type }: EmptyStateProps) {
  if (type === "no-applications") {
    return (
      <Card className="h-[400px] md:h-[500px] flex flex-col">
        <CardContent className="flex-1 flex flex-col items-center justify-center py-12">
          <Building2 size={48} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Inga ansökningar än</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            Lägg till din första LIA-ansökan för att komma igång!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center mb-6">
          <Building2 size={32} className="text-blue-500" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">
        Inga resultat hittades
      </h3>
      <p className="text-muted-foreground text-center max-w-md leading-relaxed">
        Prova att justera dina filter eller sökkriterier för att hitta dina
        ansökningar.
      </p>
      <div className="mt-6 flex gap-2">
        <div className="px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
          Tips: Sök på företagsnamn
        </div>
        <div className="px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
          eller roll
        </div>
      </div>
    </div>
  );
}
