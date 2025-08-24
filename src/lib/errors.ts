import { PostgrestError } from "@supabase/supabase-js";

export class AppError extends Error {
  issues?: unknown;
  constructor(message: string, issues?: unknown) {
    super(message);
    this.name = "APP_ERROR";
    this.issues = issues;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, issues?: unknown) {
    super(message, issues);
    this.name = "VALIDATION_ERROR";
  }
}

export function isSupabaseError(error: unknown): error is PostgrestError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error
  );
}
