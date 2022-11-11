import { ListInvite } from "@prisma/client";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import AlertError from "src/components/AlertError";
import DashboardNav from "src/components/DashboardNav";
import LoadingScene from "src/components/Loading";

import { trpc } from "src/utils/trpc";

const List: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const listId = router.query.id as string;
  const {
    data,
    refetch,
    status: listStatus,
  } = trpc.useQuery(["lists.findById", { listId }], { enabled: false });
  const onInviteSuccess = useCallback((invite: ListInvite) => {
    console.log({ invite });
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated") {
      refetch();
    }
  }, [refetch, router, status]);

  switch (status) {
    case "unauthenticated":
      return <div />;
    default:
      break;
  }

  if (!session || [status, listStatus].indexOf("loading") !== -1) {
    return <LoadingScene />;
  }

  return (
    <>
      <DashboardNav />
      {!data && <AlertError error="We could not find this list." />}
      {data && (
        <div className="flex flex-col px-0.5">
          <h1 className="flex justify-between items-center">
            {data && data.list.name}
            {/*
              Only the owner of the list can invite other users
             */}
            {data.list.userId === session.user?.id && (
              <Link href={`/list/${data.list.id}/invites`}>
                <span className="text-blue-500 text-lg hover:cursor-pointer">
                  ➕ Invite friends to list
                </span>
              </Link>
            )}
          </h1>
        </div>
      )}
    </>
  );
};

export default List;
