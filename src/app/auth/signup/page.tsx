"use client";

import { AuthForm } from "@/components/auth-form";
import { useState } from "react";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    setLoading(true);
    setError(undefined);

    try {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords don't match");
      }

      console.log("Signup data:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}
