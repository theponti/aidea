import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNav from "src/components/DashboardNav";
import ListForm from "src/components/ListForm";
import LoadingScene from "src/components/Loading";

import PageWrap from "src/components/PageWrap";
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
    <PageWrap>
      <DashboardNav router={router} />
      <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 flex flex-col">
        <ListForm onCreate={refetch} />
        <div>
          {data?.length === 0 && "Your lists will appear here."}
          {data && data.length > 0 && (
            <ul className="space-y-2">
              {data.map((list) => (
                <li
                  key={list.listId}
                  // onDelete={refetch}
                >
                  {list.list.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PageWrap>
  );
};

export default Lists;
