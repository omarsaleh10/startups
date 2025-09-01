import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4 w-full">
        {/* Logo - positioned at far left */}
        <Link href="/" className="inline-flex items-center gap-2 group">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={30}
            priority
            className="h-8 w-auto transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Right side - positioned at far right */}
        <div className="flex items-center gap-4 ml-auto">
          {session?.user ? (
            <>
              {/* New startup button */}
              <Link
                href="/startup/create"
                className="inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md active:scale-95"
              >
                New Startup
              </Link>

              {/* Logout button */}
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
                className="inline-flex"
              >
                <button
                  type="submit"
                  aria-label="Logout"
                  className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-5 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 hover:text-neutral-900 active:scale-95"
                >
                  Logout
                </button>
              </form>

              {/* Profile */}
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-700 shadow-sm transition-all hover:bg-neutral-100"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-black via-neutral-800 to-neutral-600 text-xs font-semibold text-white shadow-sm">
                  {session?.user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                </span>
                <span className="max-w-[12ch] truncate">{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            /* Login button */
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="inline-flex"
            >
              <button
                type="submit"
                aria-label="Login with GitHub"
                className="inline-flex items-center rounded-full bg-black px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-neutral-800 hover:shadow-md active:scale-95"
              >
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
}
