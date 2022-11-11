import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const LINKS = [
  { path: "/dashboard", text: "Ideas" },
  { path: "/lists", text: "Lists" },
  { path: "/lists/invites", text: "Invites" },
  { path: "/bookmarks", text: "Bookmarks" },
];

function DashboardNav() {
  const router = useRouter();
  return (
    <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex gap-4 py-4">
      {LINKS.map((link) => (
        <Link key={link.path} href={link.path}>
          <a
            href={link.path}
            className={classNames(
              router.pathname === link.path &&
                "underline underline-offset-4 decoration-black text-primary"
            )}
          >
            {link.text}
          </a>
        </Link>
      ))}
    </div>
  );
}

export default React.memo(DashboardNav);
