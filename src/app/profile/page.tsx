import { getUser } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) return null;
  return <p>{user.email}</p>;
}
