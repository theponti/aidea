import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import AlertError from "src/components/AlertError";
import LinkButton from "src/components/LinkButton";
import ListInviteForm from "src/components/ListInviteForm";
import LoadingScene from "src/components/Loading";

import { trpc } from "src/utils/trpc";

const List: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const listId = router.query.id as string;
  const {
    data: userList,
    status: listStatus,
    refetch: getList,
  } = trpc.useQuery(["lists.findById", { listId }], { enabled: false });
  const {
    data: listInvites,
    status: invitesStatus,
    refetch: getInvites,
  } = trpc.useQuery(["lists.listInvites", { listId }], { enabled: false });
  const onInviteSuccess = useCallback(() => getInvites(), [getInvites]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  useEffect(() => {
    if (status === "authenticated" && listId) {
      getList();
      getInvites();
    }
  }, [getInvites, getList, listId, status]);

  if (status === "unauthenticated") {
    return <div />;
  }

  if ([status, listStatus, invitesStatus].indexOf("loading") > 0) {
    return <LoadingScene />;
  }

  if (!userList) {
    return <AlertError error="We could not find this list." />;
  }

  return (
    <>
      <div className="flex mb-8">
        <LinkButton href={`/list/${userList.list.id}`}>
          <span className="mr-1">⬅️</span> Back to list
        </LinkButton>
      </div>
      <div className="flex flex-col px-0.5">
        <h1>
          <span className="text-gray-600">{userList.list.name}</span> Invites
        </h1>
      </div>
      <ListInviteForm listId={listId} onCreate={onInviteSuccess} />
      {listInvites &&
        (listInvites.length > 0 ? (
          <ul className="space-y-2">
            {listInvites.map(({ accepted, invitedUserEmail }) => (
              <li
                key={invitedUserEmail}
                className="card shadow-md p-4 text-lg flex flex-row justify-between"
              >
                <p className="text-sm text-gray-400">{invitedUserEmail}</p>
                {accepted ? (
                  <span className="text-sm">✅ Accepted</span>
                ) : (
                  <span className="text-sm">⏳ Pending</span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg flex justify-center p-4 font-semibold">
            No homies invited to this list yet.
          </p>
        ))}
    </>
  );
};

export default List;
