"use client";

import { AuthForm } from "@/components/auth-form";
import { login } from "@/lib/auth-actions";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      console.log("Running");
      await login(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      mode="login"
      onSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
}
