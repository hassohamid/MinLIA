"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ChevronDown,
  ChevronUp,
  Plus,
  Building2,
  Calendar,
  User,
  CheckCircle2,
  Send,
  UserCheck,
  MessageSquare,
  Loader2,
  Info,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createApplication } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { signInWithGoogle } from "@/lib/auth-actions";

export interface ApplicationFormProps {
  company: string;
  role: string;
  status: "skickat" | "besvarat" | "antagen";
  applied_date: string;
}

export function AddApplicationForm() {
  const [formData, setFormData] = useState<ApplicationFormProps>({
    company: "",
    applied_date: new Date().toISOString().split("T")[0],
    role: "",
    status: "skickat",
  });

  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const router = useRouter();

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

  const handleToggle = async () => {
    // Check if user is authenticated before opening form
    if (!user) {
      try {
        const result = await signInWithGoogle(window.location.origin);
        if (result?.url) {
          window.location.href = result.url;
        }
      } catch (err) {
        console.error("Google sign-in failed:", err);
      }
      return;
    }
    setToggleForm((prev) => !prev);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Double-check authentication before submitting
    if (!user) {
      try {
        const result = await signInWithGoogle(window.location.origin);
        if (result?.url) {
          window.location.href = result.url;
        }
      } catch (err) {
        console.error("Google sign-in failed:", err);
      }
      return;
    }

    setLoading(true);
    const result = await createApplication(formData);
    if (!result.success) {
      if (result.type === "validation") {
        console.error(result.error, result.issues);
      }
      if (result.type === "auth") {
        // Trigger Google OAuth if auth failed
        try {
          const authResult = await signInWithGoogle(window.location.origin);
          if (authResult?.url) {
            window.location.href = authResult.url;
          }
        } catch (err) {
          console.error("Google sign-in failed:", err);
        }
        return;
      }
    } else {
      // Reset form and close on success
      setFormData({
        company: "",
        applied_date: new Date().toISOString().split("T")[0],
        role: "",
        status: "skickat",
      });
      setToggleForm(false);
    }

    setLoading(false);
  }

  const isFormValid =
    formData.company &&
    formData.applied_date &&
    formData.role &&
    formData.status;

  return (
    <Card className="border-dashed border-2 border-muted-foreground/30 transition-all duration-300 overflow-hidden shadow-none bg-gradient-to-br from-background to-muted/20 hover:border-muted-foreground/50">
      <CardHeader className="pb-3">
        <Button
          variant="ghost"
          className="w-full flex justify-between items-center hover:bg-muted/50 h-14 transition-all duration-200 group"
          onClick={handleToggle}
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
            {toggleForm ? (
              <ChevronUp size={20} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={20} className="text-muted-foreground" />
            )}
          </div>
        </Button>
      </CardHeader>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          toggleForm ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <CardContent className="pt-0 border-t border-dashed border-muted-foreground/20">
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Company Name */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="companyName"
                  className="flex items-center justify-between text-sm font-medium"
                >
                  <div className="flex items-center gap-2">
                    <Building2 size={16} className="text-blue-500" />
                    Företagsnamn
                  </div>
                  <span
                    className={`text-xs ${
                      formData.company.length > 20
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formData.company.length}/25
                  </span>
                </Label>
                <div className="relative">
                  <Input
                    id="company"
                    type="text"
                    placeholder="t.ex. TechCorp AB"
                    value={formData.company}
                    onChange={(e) =>
                      handleInputChange("company", e.target.value.slice(0, 25))
                    }
                    className="pl-4 pr-4 h-11 border-muted-foreground/20 focus:border-blue-500 transition-colors bg-background/50"
                    required
                    maxLength={25}
                  />
                </div>
              </div>

              {/* Application Date */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="applied_date"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Calendar size={16} className="text-green-500" />
                  Ansökningsdatum
                </Label>
                <Input
                  id="applied_date"
                  type="date"
                  value={formData.applied_date}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handleInputChange("applied_date", e.target.value)
                  }
                  className="h-11 border-muted-foreground/20 focus:border-green-500 transition-colors bg-background/50"
                  required
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-3 group">
              <Label
                htmlFor="role"
                className="flex items-center justify-between text-sm font-medium"
              >
                <div className="flex items-center gap-2">
                  <User size={16} className="text-purple-500" />
                  Roll/Position
                </div>
                <span
                  className={`text-xs ${
                    formData.role.length > 25
                      ? "text-red-500"
                      : "text-muted-foreground"
                  }`}
                >
                  {formData.role.length}/30
                </span>
              </Label>
              <Input
                id="role"
                type="text"
                placeholder="t.ex. Frontend Developer"
                value={formData.role}
                onChange={(e) =>
                  handleInputChange("role", e.target.value.slice(0, 30))
                }
                className="h-11 border-muted-foreground/20 focus:border-purple-500 transition-colors bg-background/50"
                required
                maxLength={30}
              />
            </div>

            {/* Status */}
            <div className="space-y-3 group">
              <Label
                htmlFor="status"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <CheckCircle2 size={16} className="text-amber-500" />
                Status
                <div className="hidden sm:block">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="ml-2 w-4 h-4 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center cursor-help">
                          <Info
                            size={10}
                            className="text-gray-600 dark:text-gray-400"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="p-0 border-0 bg-transparent shadow-none"
                        sideOffset={8}
                      >
                        <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-2xl p-4 min-w-[280px] max-w-[320px]">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3 py-2">
                              <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center">
                                <Send size={12} className="text-yellow-400" />
                              </div>
                              <div className="flex-1">
                                <div className="text-white text-sm font-medium">
                                  Skickat
                                </div>
                                <div className="text-gray-400 text-xs">
                                  Ansökan är skickad
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                              <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center">
                                <MessageSquare
                                  size={12}
                                  className="text-blue-400"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-white text-sm font-medium">
                                  Besvarat
                                </div>
                                <div className="text-gray-400 text-xs">
                                  Företaget har svarat
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 py-2">
                              <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center">
                                <UserCheck
                                  size={12}
                                  className="text-green-400"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-white text-sm font-medium">
                                  Antagen
                                </div>
                                <div className="text-gray-400 text-xs">
                                  Du har fått platsen
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger className="h-11 border-muted-foreground/20 focus:border-amber-500 bg-background/50">
                  <SelectValue placeholder="Välj status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skickat">
                    <div className="flex items-center gap-2">
                      <Send size={14} className="text-yellow-600" />
                      Skickat
                    </div>
                  </SelectItem>
                  <SelectItem value="besvarat">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-blue-600" />
                      Besvarat
                    </div>
                  </SelectItem>
                  <SelectItem value="antagen">
                    <div className="flex items-center gap-2">
                      <UserCheck size={14} className="text-green-600" />
                      Antagen
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" />
                  Lägger till...
                </div>
              ) : (
                "Lägg till ansökan"
              )}
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
