"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FormHeader } from "./FormHeader";
import { SubmitButton } from "./SubmitButton";
import { CompanyField } from "./fields/CompanyField";
import { DateField } from "./fields/DateField";
import { RoleField } from "./fields/RoleField";
import { StatusField } from "./fields/StatusField";
import { useAuth } from "./hooks/useAuth";
import { useFormState } from "./hooks/useFormState";
import { useFormSubmission } from "./hooks/useFormSubmission";

export function AddApplicationForm() {
  const { user } = useAuth();
  const {
    formData,
    isToggled,
    isLoading,
    isFormValid,
    handleInputChange,
    resetForm,
    toggleForm,
    setIsLoading,
  } = useFormState();
  const { submitForm, handleAuthRequired } = useFormSubmission();

  const handleToggle = async () => {
    if (!user) {
      await handleAuthRequired();
      return;
    }
    toggleForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm(formData, user, setIsLoading, resetForm);
  };

  return (
    <Card className="border-dashed border-2 border-muted-foreground/30 transition-all duration-300 overflow-hidden shadow-none bg-gradient-to-br from-background to-muted/20 hover:border-muted-foreground/50">
      <CardHeader className="pb-3">
        <FormHeader isToggled={isToggled} onToggle={handleToggle} />
      </CardHeader>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isToggled ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <CardContent className="pt-0 border-t border-dashed border-muted-foreground/20">
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CompanyField
                value={formData.company}
                onChange={handleInputChange}
              />
              <DateField
                value={formData.applied_date}
                onChange={handleInputChange}
              />
            </div>

            <RoleField value={formData.role} onChange={handleInputChange} />
            <StatusField value={formData.status} onChange={handleInputChange} />

            <SubmitButton isLoading={isLoading} isValid={isFormValid} />
          </form>
        </CardContent>
      </div>
    </Card>
  );
}
