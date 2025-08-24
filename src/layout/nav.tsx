import { getUser } from "@/lib/supabase/server";
import { NavUser } from "./nav-user";
import { Heart } from "lucide-react";
import SignedOut from "./signed-out";
import Link from "next/link";

export default async function Nav() {
  const user = await getUser();
  return (
    <nav className="py-3 h-[70px] w-full">
      <div className="max-w-5xl mx-auto px-10 md:px-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-semibold text-lg md:text-xl tracking-tighter">
            MinLIA
          </span>
          <Heart
            size={20}
            className="text-red-500 fill-red-500 transform rotate-12 group-hover:rotate-0 transition-transform duration-300 ease-out"
          />
        </Link>

        {user ? <NavUser user={user} /> : <SignedOut />}
      </div>
    </nav>
  );
}
