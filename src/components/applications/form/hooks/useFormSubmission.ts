import { createApplication } from "@/lib/api";
import { signInWithGoogle } from "@/lib/auth-actions";
import type { ApplicationFormData } from "../types";

export function useFormSubmission() {
  const handleAuthRequired = async () => {
    try {
      const result = await signInWithGoogle(window.location.origin);
      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error("Google sign-in failed:", err);
    }
  };

  const submitForm = async (
    formData: ApplicationFormData,
    user: any,
    setIsLoading: (loading: boolean) => void,
    resetForm: () => void
  ) => {
    // Check authentication before submitting
    if (!user) {
      await handleAuthRequired();
      return;
    }

    setIsLoading(true);
    const result = await createApplication(formData);

    if (!result.success) {
      if (result.type === "validation") {
        console.error(result.error, result.issues);
      }
      if (result.type === "auth") {
        await handleAuthRequired();
        return;
      }
    } else {
      resetForm();
    }

    setIsLoading(false);
  };

  return { submitForm, handleAuthRequired };
}
