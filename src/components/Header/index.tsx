import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { status } = useSession();
  return (
    <nav className="navbar bg-base-100 sticky top-0 left-0 px-0 drop-shadow-sm">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex-1 text-primary">
          <span className="font-semibold text-2xl">
            <Link href="/">🧠 Aidea</Link>
          </span>
        </div>
        {status !== "loading" && (
          <div className="flex-none gap-2">
            <ul className="menu menu-horizontal p-0">
              <li>
                {status === "unauthenticated" ? (
                  <button onClick={() => signIn("google")}>Sign In</button>
                ) : (
                  <Link data-testid="accountLink" href="/account">
                    My Account
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Header;
