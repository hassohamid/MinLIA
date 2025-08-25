import { AddApplicationForm } from "@/components/applications/form";
import Hero from "@/components/applications/hero";
import ApplicationList from "@/components/applications/list/ApplicationList";
import { getApplications } from "@/lib/api";

export default async function Home() {
  const applications = await getApplications();
  return (
    <div
      className="container max-w-5xl m-auto 
    px-10 md:px-3 space-y-10"
    >
      <Hero applications={applications} />
      <AddApplicationForm />
      <ApplicationList applications={applications} />
    </div>
  );
}
