import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, ChartColumnDecreasing } from "lucide-react";
import type { StatsData } from "./types";

interface StatsCardProps {
  stats: StatsData;
  user: any | null;
  authLoading: boolean;
}

export function StatsCard({ stats, user, authLoading }: StatsCardProps) {
  const statsItems = [
    {
      icon: FileText,
      label: "Ansökningar",
      value: stats.totalApplications,
      color: "text-blue-600",
    },
    {
      icon: CheckCircle,
      label: "Besvarade",
      value: stats.answeredApplications,
      color: "text-green-600",
    },
  ];

  return (
    <Card className="hidden lg:flex lg:container lg:max-w-lg flex-col justify-center p-8 relative bg-background/50 backdrop-blur-sm border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-foreground">Statistik</h2>
        <ChartColumnDecreasing size={20} className="text-muted-foreground" />
      </div>

      <div className="space-y-4 relative">
        {statsItems.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className={`flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-opacity duration-200 ${
              user ? "opacity-100" : "opacity-30 blur-sm"
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className={color} />
              <span className="text-sm font-medium">{label}</span>
            </div>
            <span className="text-2xl font-semibold">
              {user ? value : "••"}
            </span>
          </div>
        ))}

        {/* Overlay for non-logged in users */}
        {!user && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <span className="text-sm font-medium text-muted-foreground">
                {authLoading
                  ? "Laddar..."
                  : "Logga in för att se din statistik"}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
