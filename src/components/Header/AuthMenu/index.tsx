import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback } from "react";

interface AuthMenuButtonProps {
  status: string;
}
function AuthMenuButton({ status }: AuthMenuButtonProps) {
  const onSignInClick = useCallback(() => {
    signIn("google");
  }, []);

  if (status === "unauthenticated") {
    return (
      <button onClick={onSignInClick} data-testid="signInButton">
        Sign In
      </button>
    );
  }

  return (
    <Link data-testid="accountLink" href="/account">
      My Account
    </Link>
  );
}

function AuthMenu() {
  const { status } = useSession();

  if (status === "loading") {
    return null;
  }

  return (
    <div className="flex-none gap-2">
      <ul className="menu menu-horizontal p-0">
        <li>
          <AuthMenuButton status={status} />
        </li>
      </ul>
    </div>
  );
}

export default AuthMenu;
