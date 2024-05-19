"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LINKS = [
  { path: "/ideas", text: "Ideas" },
  { path: "/bookmarks", text: "Bookmarks" },
  { path: "/lists", text: "Lists" },
  { path: "/lists/invites", text: "Invites" },
];

function DashboardNav() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 py-4 mt-2">
      {LINKS.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={classNames(
            pathname === link.path &&
              "underline underline-offset-4 decoration-black text-primary font-bold decoration-2",
          )}
        >
          {link.text}
        </Link>
      ))}
    </div>
  );
}

export default React.memo(DashboardNav);
