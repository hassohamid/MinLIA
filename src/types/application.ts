export interface Application {
  id?: number;
  company: string;
  role: string;
  applied_date: string;
  status: "skickat" | "besvarat" | "antagen";
  is_favorite?: boolean;
}
