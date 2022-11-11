import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNav from "src/components/DashboardNav";
import ListForm from "src/components/ListForm";
import LoadingScene from "src/components/Loading";

import { trpc } from "src/utils/trpc";

const Lists: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { data, refetch } = trpc.useQuery(["lists.get"]);

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
      <DashboardNav router={router} />
      <h1>Lists</h1>
      <ListForm onCreate={refetch} />
      <div>
        {data?.length === 0 && "Your lists will appear here."}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map(({ user, ...list }) => (
              <li key={list.listId} className="card shadow-md p-4 text-lg">
                <Link href={`/list/${list.listId}`}>{list.list.name}</Link>
                {user && <p className="text-sm text-gray-400">{user.email}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Lists;
