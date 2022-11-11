import { List, ListInvite } from "@prisma/client";
import classNames from "classnames";
import React, { useCallback } from "react";
import { trpc } from "src/utils/trpc";

type ListInviteItemProps = {
  invite: ListInvite & { list: List };
  onAcceptInvite: () => void;
};
function ListInviteItem({ invite, onAcceptInvite }: ListInviteItemProps) {
  const mutation = trpc.useMutation("lists.acceptInvite");
  const acceptInvite = useCallback(async () => {
    await mutation.mutateAsync({ listId: invite.listId });
    onAcceptInvite();
  }, [invite.listId, mutation, onAcceptInvite]);

  return (
    <li className="card shadow-md px-2 py-4 text-primary flex flex-row justify-between items-center">
      <p className={classNames("text-lg", !invite.accepted && "text-gray-400")}>
        {invite.list.name}
      </p>
      <div>
        {invite.accepted ? (
          <p>
            <span className="ml-2">✅</span> Accepted
          </p>
        ) : (
          <button
            className="btn-success btn-sm rounded-md"
            onClick={acceptInvite}
          >
            Accept
          </button>
        )}
      </div>
    </li>
  );
}

export default React.memo(ListInviteItem);
