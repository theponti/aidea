import Link from "next/link";
import { redirect } from "next/navigation";

import { api } from "@/lib/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import AlertError from "components/AlertError";
import DashboardNav from "components/DashboardNav";
import UserPlus from "components/Icons/UserPlus";

export default async function List({
  params: { id: listId },
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  const data = await api.lists.findById({ listId });

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <DashboardNav />
      {!data && <AlertError error="We could not find this list." />}
      {data && (
        <div className="flex flex-col px-0.5">
          <h1 className="mb-1">
            {data && data.list.name}
            {/* Only the owner of the list can invite other users */}
          </h1>
          {data.list.userId === session.user?.id && (
            <Link href={`/list/${data.list.id}/invites`}>
              <span className="text-blue-500 text-lg hover:cursor-pointer">
                <UserPlus stroke="black" className="w-6 h-6" />
              </span>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
