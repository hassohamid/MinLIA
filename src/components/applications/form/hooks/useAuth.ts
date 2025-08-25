import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { AuthState } from "../types";

export function useAuth(): AuthState {
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setAuthLoading(false);
    };
    checkAuth();
  }, []);

  return { user, authLoading };
}
