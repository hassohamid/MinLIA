"use client";
import { WelcomeSection } from "./WelcomeSection";
import { StatsCard } from "./StatsCard";
import { useAuth } from "./hooks/useAuth";
import { useStats } from "./hooks/useStats";
import type { Application } from "@/types";

interface HeroProps {
  applications: Application[];
}

export function Hero({ applications }: HeroProps) {
  const { user, authLoading } = useAuth();
  const stats = useStats(applications);

  return (
    <div className="flex justify-between gap-2 pt-10 relative">
      <WelcomeSection user={user} authLoading={authLoading} />
      <StatsCard stats={stats} user={user} authLoading={authLoading} />
    </div>
  );
}
