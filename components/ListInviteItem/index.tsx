import { api } from "@/lib/trpc/react";
import { List, ListInvite, User } from "@prisma/client";
import classNames from "classnames";
import React, { useCallback } from "react";

type ListInviteItemProps = {
  invite: ListInvite & { list: List; user: User };
  onAcceptInvite: () => void;
};
function ListInviteItem({ invite, onAcceptInvite }: ListInviteItemProps) {
  const mutation = api.lists.acceptInvite.useMutation();
  const acceptInvite = useCallback(async () => {
    await mutation.mutateAsync({ listId: invite.listId });
    onAcceptInvite();
  }, [invite.listId, mutation, onAcceptInvite]);

  return (
    <li className="card shadow-md px-2 py-4 text-primary flex flex-row justify-between">
      <p
        className={classNames(
          "text-lg flex flex-col gap-2",
          !invite.accepted && "text-gray-400",
        )}
      >
        <span className="text-lg font-semibold">{invite.list.name}</span>
        <span className="text-sm text-gray-400">{invite.user.email}</span>
      </p>
      <div>
        {invite.accepted ? (
          <p className="text-md">✅ Accepted</p>
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
