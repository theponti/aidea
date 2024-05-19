import { api } from "@/lib/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import LinkButton from "components/LinkButton";
import ListInviteForm from "components/ListInviteForm";
import { notFound, redirect } from "next/navigation";

export default async function invitesPage({
  params: { id: listId },
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const data = await api.lists.findById({ listId });

  if (!data) {
    return notFound();
  }

  const { list } = data;
  const invites = await api.lists.listInvites({ listId });

  return (
    <>
      <div className="flex mb-8">
        <LinkButton href={`/list/${list.id}`}>
          <span className="mr-1">⬅️</span> Back to list
        </LinkButton>
      </div>
      <div className="flex flex-col px-0.5">
        <h1>
          <span className="text-gray-600">{list.name}</span> Invites
        </h1>
      </div>
      <ListInviteForm listId={listId} />
      {invites &&
        (invites.length > 0 ? (
          <ul className="space-y-2">
            {invites.map(({ accepted, invitedUserEmail }) => (
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
}
