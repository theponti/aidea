"use client";

import ListInviteItem from "@/components/ListInviteItem";
import { api } from "@/lib/trpc/react";
import { List, ListInvite, User } from "@prisma/client";

type ReceivedListInvite = ListInvite & {
  list: List;
  user: User;
};

export default function ListInvitesReceivedList({
  invites,
}: {
  invites: ReceivedListInvite[];
}) {
  const { data, refetch } = api.lists.invites.useQuery(void 0, {
    enabled: !!invites.length,
    initialData: invites,
  });

  return (
    <div>
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
  );
}
