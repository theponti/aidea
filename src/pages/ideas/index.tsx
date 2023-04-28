import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNav from "src/components/DashboardNav";

import IdeaForm from "src/components/IdeaForm";
import IdeaListItem from "src/components/IdeaListItem";
import LoadingScene from "src/components/Loading";
import { trpc } from "src/utils/trpc";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const {
    data,
    refetch,
    status: ideasStatus,
  } = trpc.idea.getIdeas.useQuery(undefined, {
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
    <div className="flex flex-col">
      <DashboardNav />
      <div>
        <IdeaForm onCreate={refetch} />
      </div>
      <div>
        {ideasStatus === "loading" && <LoadingScene />}
        {data?.length === 0 && "your thoughts will appear here"}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((idea) => (
              <IdeaListItem key={idea.id} idea={idea} onDelete={refetch} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
