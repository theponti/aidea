import { signOut, useSession } from "next-auth/react";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import AlertError from "src/components/AlertError";
import PageWrap from "src/components/PageWrap";
import { trpc } from "src/utils/trpc";

const Account = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pictureUrl = session?.user?.image as string;
  const deleteUser = trpc.useMutation("auth.deleteUser");
  const onDelectAccount = useCallback(async () => {
    // Delete user
    await deleteUser.mutateAsync();
    // Sign user out
    signOut();
  }, [deleteUser]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "loading") {
    return "Loading";
  }

  if (status === "unauthenticated") {
    return <div />;
  }

  return (
    <PageWrap>
      <div className="col-span-12">
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
      </div>
    </PageWrap>
  );
};

export default Account;
