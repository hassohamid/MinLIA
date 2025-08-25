import type { User } from "@supabase/supabase-js";

export interface StatsData {
  totalApplications: number;
  answeredApplications: number;
  responseRate: number;
}

export interface DashboardState {
  user: User | null;
  authLoading: boolean;
  stats: StatsData;
}
