import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import DashboardNav from "components/DashboardNav";
import ListInviteItem from "components/ListInviteItem";
import LoadingScene from "components/Loading";
import { trpc } from "lib/trpc";

const ListInvites: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const {
    data,
    refetch,
    status: invitesStatus,
  } = trpc.lists.invites.useQuery(undefined, { enabled: false });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated") {
      refetch();
    }
  }, [refetch, router, status]);

  switch (status) {
    case "loading":
      return <LoadingScene />;
    case "unauthenticated":
      return <div />;
    default:
      break;
  }

  return (
    <>
      <DashboardNav />
      <h1>List Invites</h1>
      <div>
        {invitesStatus === "loading" && <LoadingScene />}
        {data?.length === 0 && "Invites others have sent you will appear here."}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((invite) => (
              <ListInviteItem
                key={invite.listId}
                invite={invite}
                onAcceptInvite={refetch}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ListInvites;
