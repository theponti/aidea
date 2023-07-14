import styled from "@emotion/styled";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

import Avatar from "src/components/Avatar";
import { ACCOUNT_PATH } from "src/constants/routes";

import NavMenuItem from "./components/NavMenuItem";

import styles from "./AuthNavMenu.module.css";

const Wrap = styled(NavMenuItem)`
  display: flex;
  gap: 10px;
  border: 1px solid slateblue;
  border-radius: 50px;
  padding: 4px;
  margin: -4px -4px 0 0;

  &:hover {
    box-shadow: 0px 2px 5px 0px slateblue;
  }
`;

const AuthNavMenu = () => {
  const router = useRouter();
  const onAccountClick = useCallback(() => {
    router.push(ACCOUNT_PATH);
  }, [router]);
  const onLogoutClick = useCallback(() => {
    signOut();
  }, []);
  const { data: session, status } = useSession();
  const pictureUrl = session?.user?.image as string;

  switch (status) {
    case "loading":
      return null;
    case "unauthenticated":
      return <div />;
    default:
      break;
  }

  return (
    <Wrap data-testid="AuthenticatedMenu">
      <Avatar
        src={pictureUrl}
        alt={session?.user?.name || ""}
        fallback="My account"
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.IconButton} aria-label="account menu">
            <HamburgerMenuIcon />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={styles.DropdownMenuContent}
            align="end"
            sideOffset={5}
          >
            <DropdownMenu.Item
              className={styles.DropdownMenuItem}
              onClick={onAccountClick}
            >
              Account
            </DropdownMenu.Item>
            <DropdownMenu.Separator className={styles.DropdownMenuSeparator} />
            <DropdownMenu.Item
              className={styles.DropdownMenuItem}
              onClick={onLogoutClick}
            >
              Logout
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </Wrap>
  );
};

export default AuthNavMenu;
