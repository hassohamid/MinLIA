"use client";

import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

interface FormHeaderProps {
  isToggled: boolean;
  onToggle: () => void;
}

export default function FormHeader({ isToggled, onToggle }: FormHeaderProps) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleClick = async () => {
    if (loading) return;

    if (!user) {
      const supabase = createClient();
      const { data } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback?next=${window.location.pathname}`,
        },
      });

      if (data.url) {
        window.location.href = data.url;
      }
    } else {
      onToggle();
    }
  };

  return (
    <Button
      variant="ghost"
      className="w-full flex justify-between items-center hover:bg-muted/50 h-14 transition-all duration-200 group"
      onClick={handleClick}
      disabled={loading}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Plus
            size={18}
            className="text-primary transition-transform group-hover:rotate-90 duration-200"
          />
        </div>
        <div className="text-left">
          <span className="font-medium">Lägg till ny ansökan</span>
          <p className="text-xs text-muted-foreground">
            Spåra din nästa LIA-möjlighet
          </p>
        </div>
      </div>
      <div className="transition-transform duration-300 ease-out">
        {user && isToggled ? (
          <ChevronUp size={20} className="text-muted-foreground" />
        ) : (
          <ChevronDown size={20} className="text-muted-foreground" />
        )}
      </div>
    </Button>
  );
}
