import { getUser } from "@/lib/supabase/server";
import { NavUser } from "./nav-user";

import SignedOut from "./signed-out";
import Link from "next/link";

export default async function Nav() {
  const user = await getUser();
  return (
    <nav className="py-3 h-[70px] w-full">
      <div className="max-w-5xl mx-auto px-10 md:px-3 flex justify-between items-center">
        <Link
          href="/"
          className="font-semibold text-lg md:text-xl tracking-tighter "
        >
          MinLIA
        </Link>

        {user ? <NavUser user={user} /> : <SignedOut />}
      </div>
    </nav>
  );
}
