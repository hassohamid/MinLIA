"use server";
import type { ApplicationFormProps } from "@/components/applications/form";
import { AppError, ValidationError } from "./errors";

export async function createApplication(data: ApplicationFormProps) {
  try {
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      const message = result?.error ?? "Misslyckades att spara ansökningen";
      const issues = result.issues ?? "";
      throw new ValidationError(message, issues);
    }
    return result;
  } catch (err) {
    throw err;
  }
}

export async function fetchApplications() {
  try {
    const res = await fetch("/api/applications");
    const result = await res.json();
    if (!res.ok) {
      const message = result?.error ?? "Misslyckades att hämta ansökningar";
      const issues = result.issues ?? "";
      throw new AppError(message, issues);
    }
  } catch (err) {
    throw err;
  }
}
