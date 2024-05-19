import { api } from "@/lib/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import DashboardNav from "components/DashboardNav";
import { redirect } from "next/navigation";
import ListInvitesReceivedList from "./list-invites-received-list";

export default async function ListInvitesReceivedPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const data = await api.lists.invites();

  return (
    <>
      <DashboardNav />
      <h1>List Invites</h1>
      <ListInvitesReceivedList invites={data} />
    </>
  );
}
