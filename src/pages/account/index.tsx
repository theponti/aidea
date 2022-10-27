import type { GetServerSidePropsContext, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/future/image";
import { useCallback } from "react";

import AlertError from "src/components/AlertError";
import { getProtectedServerSideProps } from "src/utils";
import { trpc } from "src/utils/trpc";

import PageWrap from "../../components/PageWrap";

const Account: NextPage = () => {
  const { data: session } = useSession();
  const pictureUrl = session?.user?.image as string;
  const deleteUser = trpc.useMutation("auth.deleteUser");
  const onDelectAccount = useCallback(async () => {
    // Delete user
    await deleteUser.mutateAsync();
    // Sign user out
    signOut();
  }, [deleteUser]);

  return (
    <main>
      <PageWrap>
        <h1>Account</h1>

        <div className="card bg-neutral-focus shadow-xl md:max-w-sm">
          <div className="card-body place-items-center">
            <Image
              alt="profile picture"
              src={pictureUrl.replace("_normal", "")}
              width={100}
              height={100}
              className="avatar rounded-full border-4 border-base-content border-solid w-28 h-28"
            />
            <p className="text-lg">{session?.user?.name}</p>
          </div>
        </div>
        <div className="flex flex-col mb-12"></div>

        <button className="btn btn-ghost" onClick={() => signOut()}>
          Log out
        </button>

        <div className="mt-8 divider" />

        {deleteUser.error && <AlertError error={deleteUser.error.message} />}

        <button className="btn btn-ghost text-error" onClick={onDelectAccount}>
          Delete account
        </button>
      </PageWrap>
    </main>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const response = await getProtectedServerSideProps(ctx);

  return response;
}

export default Account;
