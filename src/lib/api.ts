"use server";

import type { ApplicationFormProps } from "@/components/applications/form";
import { z, ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";

import { isSupabaseError } from "@/lib/errors";

const ApplicationSchema = z.object({
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  status: z.enum(["skickat", "besvarat", "antagen"]),
  applied_date: z.iso.date(),
});

export async function createApplication(data: ApplicationFormProps) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Unauthorized", type: "auth" };
    }

    const validatedData = ApplicationSchema.parse(data);

    const { error } = await supabase
      .from("applications")
      .insert({ user_id: user.id, ...validatedData });

    if (error) throw error;

    return { success: true };
  } catch (err) {
    if (err instanceof ZodError) {
      return {
        success: false,
        error: "Validation failed",
        type: "validation",
        issues: err.issues,
      };
    }
    if (isSupabaseError(err)) {
      return {
        success: false,
        error: err.message,
        type: "database",
        code: err.code,
      };
    }
    throw err;
  }
}

export async function getApplications() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Unauthorized", type: "auth" };
    }

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .eq("user_id", user.id);

    if (error) throw error;
    console.log(data);
    return data ?? [];
  } catch (err) {
    if (isSupabaseError(err)) {
      return {
        success: false,
        error: err.message,
        type: "database",
        code: err.code,
      };
    }
    throw err;
  }
}
