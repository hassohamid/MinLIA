import { AddApplicationForm } from "@/components/applications/form";
import Hero from "@/components/applications/hero";
import ApplicationList from "@/components/applications/list";

export default function Home() {
  return (
    <div
      className="container max-w-5xl m-auto 
    px-10 md:px-3 space-y-10"
    >
      <Hero />
      <AddApplicationForm />
      <ApplicationList />
    </div>
  );
}
