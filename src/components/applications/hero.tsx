"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  FileText,
  CheckCircle,
  ChartColumnDecreasing,
  Bookmark,
  MousePointer2,
} from "lucide-react";
import type { Application } from "./types";
import { createClient } from "@/lib/supabase/client";

export default function Hero({
  applications,
}: {
  applications: Application[];
}) {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  const totalApplications = applications.length;
  const answeredApplications = applications.filter(
    (app) => app.status === "besvarat"
  ).length;

  return (
    <div className="flex justify-between  gap-2 pt-10 relative">
      <div className="absolute h-60 w-full bg-blue-50/30 dark:bg-neutral-100/5 -z-22 blur-3xl rounded-full"></div>
      <div className="p-6 mt-10  border-l-5 border-blue-700 rounded-xl relative">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight   ">
          Din LIA-koll<span className="text-green-300">.</span>
        </h1>
        <h1 className="text-muted-foreground font-medium text-[13px] sm:text-sm ">
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
              {authLoading
                ? "Laddar..."
                : user
                ? "Spåra och hantera alla dina ansökningar"
                : "Ett klick för att registrera dig "}
            </span>
          </div>
        </div>
      </div>
      <Card className="hidden lg:flex lg:container lg:max-w-lg flex-col justify-center p-8 relative bg-background/50 backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-foreground">Statistik</h2>
          <ChartColumnDecreasing size={20} className="text-muted-foreground" />
        </div>

        <div className="space-y-4 relative">
          <div
            className={`flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-opacity duration-200 ${
              !authLoading && !user ? "opacity-30 blur-sm" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-blue-600" />
              <span className="text-sm font-medium">Totalt</span>
            </div>
            <span className="text-2xl font-semibold">
              {user ? totalApplications : "••"}
            </span>
          </div>

          <div
            className={`flex items-center justify-between p-4 rounded-lg bg-muted/30 transition-opacity duration-200 ${
              !authLoading && !user ? "opacity-30 blur-sm" : "opacity-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-sm font-medium">Besvarade</span>
            </div>
            <span className="text-2xl font-semibold">
              {user ? answeredApplications : "••"}
            </span>
          </div>

          {/* Overlay for logged out users */}
          {!authLoading && !user && (
            <div className="absolute inset-0 bg-background/95 backdrop-blur-md rounded-lg flex items-center justify-center">
              <div className="text-center p-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Logga in för att se din statistik
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
