import type { Application } from "@/types";
import type { StatsData } from "../types";

export function useStats(applications: Application[]): StatsData {
  const totalApplications = applications.length;
  const answeredApplications = applications.filter(
    (app) => app.status === "besvarat"
  ).length;
  const acceptedApplications = applications.filter(
    (app) => app.status === "antagen"
  ).length;
  const responseRate =
    totalApplications > 0
      ? Math.round((answeredApplications / totalApplications) * 100)
      : 0;

  return {
    totalApplications,
    answeredApplications,
    acceptedApplications,
    responseRate,
  };
}
