import Link from "next/link";
import { redirect } from "next/navigation";

import { api } from "@/lib/trpc/server";
import { getServerAuthSession } from "@/server/auth";
import DashboardNav from "components/DashboardNav";
import ListForm from "components/ListForm";

export default async function ListsPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const data = await api.lists.get();

  return (
    <>
      <DashboardNav />
      <h1>Lists</h1>
      <ListForm />
      <div>
        {data?.length === 0 && "Your lists will appear here."}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map(({ user, ...list }) => (
              <li key={list.listId} className="card shadow-md p-4 text-lg">
                <Link href={`/list/${list.listId}`}>{list.list.name}</Link>
                {/*
                  Only display list owner if the list does not belong to current user
                */}
                {user.email !== session.user?.email && (
                  <p className="text-xs text-gray-400">{user.email}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
