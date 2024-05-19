import { api } from "@/lib/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import DashboardNav from "components/DashboardNav";
import LinkButton from "components/LinkButton";
import { redirect } from "next/navigation";

export default async function ListInvitesSentPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/login");
  }

  const data = await api.lists.sentInvites();

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
}
