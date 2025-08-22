"use client";
import { useState } from "react";
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
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AddApplicationFormProps {
  onAddApplication: (application: {
    companyName: string;
    role: string;
    applicationDate: string;
    status: string;
  }) => void;
}

export function AddApplicationForm({
  onAddApplication,
}: AddApplicationFormProps) {
  const [formData, setFormData] = useState({
    companyName: "",
    applicationDate: new Date().toISOString().split("T")[0], // Default to today
    role: "",
    status: "skickat", // Default status
  });

  const [toggleForm, setToggleForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggle = () => {
    setToggleForm((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Call the parent function to add the application
    onAddApplication(formData);

    // Reset form
    setFormData({
      companyName: "",
      applicationDate: new Date().toISOString().split("T")[0],
      role: "",
      status: "skickat",
    });

    setIsSubmitting(false);
    setToggleForm(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isFormValid =
    formData.companyName &&
    formData.applicationDate &&
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
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Building2 size={16} className="text-blue-500" />
                  Företagsnamn
                </Label>
                <div className="relative">
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="t.ex. TechCorp AB"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    className="pl-4 pr-4 h-11 border-muted-foreground/20 focus:border-blue-500 transition-colors bg-background/50"
                    required
                  />
                </div>
              </div>

              {/* Application Date */}
              <div className="space-y-3 group">
                <Label
                  htmlFor="applicationDate"
                  className="flex items-center gap-2 text-sm font-medium"
                >
                  <Calendar size={16} className="text-green-500" />
                  Ansökningsdatum
                </Label>
                <Input
                  id="applicationDate"
                  type="date"
                  value={formData.applicationDate}
                  onChange={(e) =>
                    handleInputChange("applicationDate", e.target.value)
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
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User size={16} className="text-purple-500" />
                Roll/Position
              </Label>
              <Input
                id="role"
                type="text"
                placeholder="t.ex. Frontend Developer, UX Designer"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                className="h-11 border-muted-foreground/20 focus:border-purple-500 transition-colors bg-background/50"
                required
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
                  <SelectItem value="antagen">
                    <div className="flex items-center gap-2">
                      <UserCheck size={14} className="text-green-600" />
                      Antagen
                    </div>
                  </SelectItem>
                  <SelectItem value="besvarat">
                    <div className="flex items-center gap-2">
                      <MessageSquare size={14} className="text-blue-600" />
                      Besvarat
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
