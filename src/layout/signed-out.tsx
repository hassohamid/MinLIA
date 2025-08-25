"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-actions";

export default function SignedOut() {
  async function handleSignIn() {
    try {
      const result = await signInWithGoogle(window.location.origin);

      if (result?.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      console.error(
        err instanceof Error
          ? err.message
          : "Inloggning med Google misslyckades"
      );
    }
  }
  return (
    <ul className="flex items-center gap-2">
      <li>
        <Button
          onClick={handleSignIn}
          className="text-xs sm:text-sm px-3 sm:px-4 h-8 sm:h-10"
          variant="outline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-5 sm:h-5"
          >
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          <span className=" ml-1">Logga in</span>
        </Button>
      </li>
    </ul>
  );
}
