import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FileText, CheckCircle, ChartColumnDecreasing } from "lucide-react";

export default function Hero() {
  return (
    <div className="flex justify-between  gap-2 pt-10 relative">
      <div className="absolute h-60 w-full bg-neutral-100/5 -z-22 blur-3xl rounded-full"></div>
      <div className="p-6 mt-10  border-l-5 border-blue-700 rounded-xl ">
        <h1 className="text-6xl font-bold tracking-tight   ">
          Din LIA-koll<span className="text-green-300">.</span>
        </h1>
        <h1 className="text-muted-foreground font-medium  ">
          Samla och följ dina LIA-ansökningar på ett ställe.
        </h1>
      </div>
      <Card className="hidden lg:flex lg:container lg:max-w-lg items-center justify-center relative bg-accent">
        <ChartColumnDecreasing
          strokeWidth={2.2}
          className="absolute right-5 top-5 "
        />

        <h1 className="text-xl font-semibold tracking-tight border-b">
          Din statistik
        </h1>
        <div className="flex gap-6 relative">
          <Badge className="flex items-center gap-3 px-6 py-4 text-sm  tracking-tight bg-blue-500 ">
            <FileText className="!size-5" />
            55 ansökningar
          </Badge>
          <Badge className="flex items-center gap-3 px-6 py-4 text-sm  tracking-tight bg-lime-500 ">
            <CheckCircle className="!size-5" />2 besvarade
          </Badge>
          <div className="absolute h-20 w-50 bg-blue-200 -z-22 blur-3xl rounded-full"></div>
          <div className="absolute right-0 h-30 w-30 bg-lime-300 -z-22 blur-3xl rounded-full"></div>
        </div>
      </Card>
    </div>
  );
}
