import classNames from "classnames";
import Link from "next/link";
import { NextRouter } from "next/router";

export default function DashboardNav({ router }: { router: NextRouter }) {
  const links = [
    { path: "/dashboard", text: "Ideas" },
    { path: "/dashboard/recommendations", text: "Recommendations" },
  ];
  return (
    <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex gap-4 py-4">
      {links.map((link) => (
        <Link key={link.path} href={link.path}>
          <a
            href={link.path}
            className={classNames(
              router.pathname === link.path &&
                "underline underline-offset-4 text-primary decoration-neutral-content"
            )}
          >
            {link.text}
          </a>
        </Link>
      ))}
    </div>
  );
}
