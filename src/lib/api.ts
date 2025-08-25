"use server";

import type { ApplicationFormData } from "@/components/applications/form/types";
import { z, ZodError } from "zod";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

import { isSupabaseError } from "@/lib/errors";

const ApplicationSchema = z.object({
  company: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  status: z.enum(["skickat", "besvarat", "antagen"]),
  applied_date: z.iso.date(),
});

export async function createApplication(data: ApplicationFormData) {
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

    // Revalidate the home page to show the new application
    revalidatePath("/");

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
      return [];
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
      console.error("Database error:", err.message);
      return [];
    }
    console.error("Unexpected error:", err);
    return [];
  }
}

export async function updateApplicationStatus(id: number, status: string) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Unauthorized", type: "auth" };
    }

    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
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

export async function toggleApplicationFavorite(id: number) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Unauthorized", type: "auth" };
    }

    // First get current favorite status
    const { data: currentApp, error: fetchError } = await supabase
      .from("applications")
      .select("is_favorite")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (fetchError) throw fetchError;

    // Toggle the favorite status
    const { error } = await supabase
      .from("applications")
      .update({ is_favorite: !currentApp.is_favorite })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
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

export async function deleteApplication(id: number) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, error: "Unauthorized", type: "auth" };
    }

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;

    revalidatePath("/");
    return { success: true };
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
