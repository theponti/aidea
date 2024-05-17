"use client";
import { signOut } from "next-auth/react";
import { useCallback } from "react";

import { api } from "@/lib/trpc/react";
import AlertError from "components/AlertError";

export default function AccountDelete() {
  const deleteUser = api.auth.deleteUser.useMutation();
  const onDelectAccount = useCallback(async () => {
    await deleteUser.mutateAsync();
    signOut();
  }, [deleteUser]);

  return (
    <>
      {deleteUser.error && <AlertError error={deleteUser.error.message} />}
      <button className="btn btn-ghost text-error" onClick={onDelectAccount}>
        Delete account
      </button>
    </>
  );
}
