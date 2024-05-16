import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { api } from "@/lib/trpc/react";
import DashboardNav from "components/DashboardNav";
import ListForm from "components/ListForm";
import LoadingScene from "components/Loading";

const Lists: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, refetch, isPending } = api.lists.get.useQuery(undefined, {
    enabled: false,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }

    if (status === "authenticated") {
      refetch();
    }
  }, [refetch, router, status]);

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
      <DashboardNav />
      <h1>Lists</h1>
      <ListForm onCreate={refetch} />
      <div>
        {isPending && <LoadingScene />}
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
};

export default Lists;
