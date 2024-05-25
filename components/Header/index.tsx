import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import AuthNavMenu from "./AuthNavMenu";

async function Header() {
  const session = await getServerAuthSession();

  return (
    <nav className="navbar bg-base-100 sticky top-0 left-0 px-0 drop-shadow-sm border-b border-purple-200">
      <div className="container mx-auto max-w-[1200px] px-4">
        <div className="flex-1 text-primary">
          <span className="font-semibold text-2xl">
            <Link
              href="/"
              className="text-xl text-slate-600 font-extrabold uppercase tracking-tighter"
            >
              <span role="img" className="mr-2 text-lg">
                🦜
              </span>
              polly
            </Link>
          </span>
        </div>
        <div className="flex-none gap-2" data-testid="AuthMenu">
          <ul className="menu menu-horizontal p-0">
            <li>
              <AuthNavMenu session={session} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
