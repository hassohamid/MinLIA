import { useState } from "react";
import type { ApplicationFormData } from "../types";

export function useFormState() {
  const [formData, setFormData] = useState<ApplicationFormData>({
    company: "",
    applied_date: new Date().toISOString().split("T")[0],
    role: "",
    status: "skickat",
  });

  const [isToggled, setIsToggled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      company: "",
      applied_date: new Date().toISOString().split("T")[0],
      role: "",
      status: "skickat",
    });
    setIsToggled(false);
  };

  const toggleForm = () => {
    setIsToggled((prev) => !prev);
  };

  const isFormValid = Boolean(
    formData.company &&
      formData.applied_date &&
      formData.role &&
      formData.status
  );

  return {
    formData,
    isToggled,
    isLoading,
    isFormValid,
    handleInputChange,
    resetForm,
    toggleForm,
    setIsLoading,
  };
}
