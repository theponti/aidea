import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNav from "src/components/DashboardNav";
import LoadingScene from "src/components/Loading";

import RecommendationListItem from "src/components/RecommendationListItem";
import RecommendationsForm from "src/components/RecommendationsForm";
import { trpc } from "src/utils/trpc";

const Recommendations: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const {
    data,
    refetch,
    status: bookmarksStatus,
  } = trpc.useQuery(["recommendations.getRecommendations"], { enabled: false });

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
      <RecommendationsForm onCreate={refetch} />
      <div>
        {bookmarksStatus === "loading" && <LoadingScene />}
        {data?.length === 0 && "your recommendations will appear here"}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((recommendation) => (
              <RecommendationListItem
                key={recommendation.id}
                recommendation={recommendation}
                onDelete={refetch}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Recommendations;
