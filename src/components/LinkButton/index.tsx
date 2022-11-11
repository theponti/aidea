import Link from "next/link";
import { ReactNode } from "react";

type LinkButtonProps = {
  children: ReactNode;
  href: string;
};
export default function LinkButton({ children, href }: LinkButtonProps) {
  return (
    <Link href={href}>
      <span className="border-primary border-[1px] px-2 py-3 rounded-md hover:cursor-pointer">
        {children}
      </span>
    </Link>
  );
}
