import type { GetServerSidePropsContext, NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/future/image";
import { useCallback } from "react";
import { getServerSideProtectedProps } from "src/utils";
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

        {deleteUser.error && (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                <p>Something went wrong! {deleteUser.error.message}</p>
              </span>
            </div>
          </div>
        )}

        <button className="btn btn-ghost text-error" onClick={onDelectAccount}>
          Delete account
        </button>
      </PageWrap>
    </main>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { props } = await getServerSideProtectedProps(ctx);

  return { props };
}

export default Account;
