import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import DashboardNav from "src/components/DashboardNav";
import LinkButton from "src/components/LinkButton";
import LoadingScene from "src/components/Loading";
import { trpc } from "src/utils/trpc";

const ListInvites: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { data } = trpc.useQuery(["lists.sentInvites"]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

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
      <div className="my-4">
        <LinkButton href="/lists/invites">
          <span className="mr-1">⬅️</span> Back to invites
        </LinkButton>
      </div>
      <h1>Sent Invites</h1>
      <div>
        {data?.length === 0 && "Your invites will appear here."}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((invite) => (
              <li key={invite.listId} className="card shadow-md p-4">
                <p>
                  <span className="font-semibold mr-2">List:</span>
                  {invite.list.name}
                </p>
                <p>
                  <span className="font-semibold mr-2">User:</span>
                  {invite.invitedUserEmail}
                </p>
                <p>
                  <span className="font-semibold mr-2">Accepted:</span>
                  {invite.accepted ? "Accepted ✅" : "Awaiting acceptance ⏳"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ListInvites;
