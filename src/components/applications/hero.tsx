import { Card } from "@/components/ui/card";
import {
  FileText,
  CheckCircle,
  ChartColumnDecreasing,
  Bookmark,
  MousePointer2,
} from "lucide-react";

interface Application {
  id: number;
  companyName: string;
  role: string;
  applicationDate: string;
  status: string;
  isFavorite: boolean;
}

interface HeroProps {
  applications: Application[];
}

export default function Hero({ applications }: HeroProps) {
  const totalApplications = applications.length;
  const answeredApplications = applications.filter(
    (app) => app.status === "besvarat"
  ).length;

  return (
    <div className="flex justify-between  gap-2 pt-10 relative">
      <div className="absolute h-60 w-full bg-neutral-100/5 -z-22 blur-3xl rounded-full"></div>
      <div className="p-6 mt-10  border-l-5 border-blue-700 rounded-xl relative">
        <h1 className="text-6xl font-bold tracking-tight   ">
          Din LIA-koll<span className="text-green-300">.</span>
        </h1>
        <h1 className="text-muted-foreground font-medium  ">
          Samla och följ dina LIA-ansökningar på ett ställe.
        </h1>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-600">
            <Bookmark size={18} className="fill-current" />
            <span className="text-sm font-medium">Organiserat & enkelt</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600">
            <MousePointer2 size={18} className="fill-current" />
            <span className="text-sm font-medium">
              Logga in för att spara dina listor
            </span>
          </div>
        </div>
      </div>
      <Card className="hidden lg:flex lg:container lg:max-w-lg flex-col justify-center p-8 relative bg-background/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-foreground">Statistik</h2>
          <ChartColumnDecreasing size={20} className="text-muted-foreground" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-blue-600" />
              <span className="text-sm font-medium">Totalt</span>
            </div>
            <span className="text-2xl font-semibold">{totalApplications}</span>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-sm font-medium">Besvarade</span>
            </div>
            <span className="text-2xl font-semibold">
              {answeredApplications}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
