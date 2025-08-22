import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  if (user) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
}
