"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Menu } from "lucide-react";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

import Avatar from "components/Avatar";
import { ACCOUNT_PATH } from "lib/routes";

import { Button } from "@/components/ui/button";
import styles from "./AuthNavMenu.module.css";

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
      className="flex border-1 border-solid border-slateblue rounded-full p-4 hover:shadow-md hover:shadow-slateblue"
    >
      <Avatar src={pictureUrl} alt={session?.user?.name || ""} />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.IconButton} aria-label="account menu">
            <Menu />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.DropdownMenuContent}
            align="end"
            sideOffset={5}
          >
            <DropdownMenu.Item className={styles.DropdownMenuItem}>
              <Link href={ACCOUNT_PATH}>Account</Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
            <DropdownMenu.Item
              className={styles.DropdownMenuItem}
              onClick={() => signOut()}
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
