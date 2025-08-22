"use client";
import { useState } from "react";
import { AddApplicationForm } from "@/components/applications/form";
import Hero from "@/components/applications/hero";
import ApplicationList from "@/components/applications/list";

interface Application {
  id: number;
  companyName: string;
  role: string;
  applicationDate: string;
  status: string;
  isFavorite: boolean;
}

export default function Home() {
  const [applications, setApplications] = useState<Application[]>([]);

  const addApplication = (newApplication: {
    companyName: string;
    role: string;
    applicationDate: string;
    status: string;
  }) => {
    const applicationToAdd = {
      ...newApplication,
      id:
        applications.length > 0
          ? Math.max(...applications.map((app) => app.id)) + 1
          : 1,
      isFavorite: false,
    };
    setApplications((prev) => [applicationToAdd, ...prev]);
  };

  return (
    <div
      className="container max-w-5xl m-auto 
    px-10 md:px-3 space-y-10"
    >
      <Hero applications={applications} />
      <AddApplicationForm onAddApplication={addApplication} />
      <ApplicationList
        applications={applications}
        setApplications={setApplications}
      />
    </div>
  );
}
