"use client";
import { CardContent } from "@/components/ui/card";
import { CompanyField } from "./fields/CompanyField";
import { DateField } from "./fields/DateField";
import { RoleField } from "./fields/RoleField";
import { StatusField } from "./fields/StatusField";
import { SubmitButton } from "./SubmitButton";
import { createApplication } from "@/lib/api";

export default function FormBody({ isToggled }: { isToggled: boolean }) {
  async function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData.entries());
    const result = await createApplication(data);
    if (!result.success) {
      if (result.type === "VALIDATION_ERROR") {
        console.error(result.error, result.issues);
      }
    }
  }
  return (
    <div
      className={`transition-all duration-500 ease-in-out overflow-hidden ${
        isToggled ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <CardContent className="pt-0 border-t border-dashed border-muted-foreground/20">
        <form action={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CompanyField />
            <DateField />
          </div>
          <RoleField />
          <StatusField />
          <SubmitButton />
        </form>
      </CardContent>
    </div>
  );
}
