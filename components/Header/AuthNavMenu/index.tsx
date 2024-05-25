"use client";

import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

import { ACCOUNT_PATH } from "lib/routes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AuthMenu({ session }: { session: Session | null }) {
  const pictureUrl = session?.user?.image as string;

  if (!session) {
    return (
      <Button
        data-testid="signInButton"
        className="bg-slate-600 text-white rounded-xl p-2 px-4 hover:bg-slateblue-600"
        onClick={() => signIn("google")}
      >
        Sign In
      </Button>
    );
  }

  return (
    <div
      data-testid="AuthenticatedMenu"
      className="flex border border-slate-200 rounded-full p-1 px-2 hover:shadow-md hover:shadow-slateblue"
    >
      <img
        className="rounded-full h-8"
        src={pictureUrl}
        alt={session?.user?.name || ""}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="mt-2 mr-[-6px] rounded bg-white min-w-[180px] p-0 gap-0"
        >
          <DropdownMenuItem className="hover:cursor-pointer hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200 p-0">
            <Link
              className="w-full h-full hover:border-none p-4"
              href={ACCOUNT_PATH}
            >
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer hover:bg-slate-200 focus:bg-slate-200"
            onClick={() => signOut()}
          >
            <div className="w-full h-full p-2">Logout</div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
