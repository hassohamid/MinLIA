import type { ApplicationFormProps } from "@/components/applications/form";

export async function createApplication(data: ApplicationFormProps) {
  try {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applied_date: "" }),
    });
    const result = await res.json();
    if (!res.ok) {
      const message = result?.error || "Misslyckades att spara ansökningen";
      const issues = result.issues ?? "";
      console.log(message, issues);
      throw new Error(message);
    }
    return result;
  } catch (err) {
    throw err;
  }
}
