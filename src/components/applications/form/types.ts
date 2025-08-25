export interface ApplicationFormData {
  company: string;
  role: string;
  status: "skickat" | "besvarat" | "antagen";
  applied_date: string;
}

export interface FormFieldProps {
  value: string;
  onChange: (field: string, value: string) => void;
}

export interface AuthState {
  user: any | null;
  authLoading: boolean;
}

export interface FormState {
  formData: ApplicationFormData;
  isToggled: boolean;
  isLoading: boolean;
  isValid: boolean;
}
