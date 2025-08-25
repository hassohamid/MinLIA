import { WelcomeSection } from "./WelcomeSection";
import { StatsCard } from "./StatsCard";
import { getStats } from "./getStats";
import type { Application } from "@/types";
import { getUser } from "@/lib/supabase/server";

export async function Hero({ applications }: { applications: Application[] }) {
  const user = await getUser();
  const stats = getStats(applications);

  return (
    <div className="flex justify-between gap-2 pt-10 relative">
      <WelcomeSection user={user} />
      <StatsCard stats={stats} user={user} />
    </div>
  );
}
