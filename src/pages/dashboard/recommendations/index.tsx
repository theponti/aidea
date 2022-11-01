import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNav from "src/components/DashboardNav";
import LoadingScene from "src/components/Loading";

import PageWrap from "src/components/PageWrap";
import RecommendationListItem from "src/components/RecommendationListItem";
import RecommendationsForm from "src/components/RecommendationsForm";
import { trpc } from "src/utils/trpc";

const Recommendations: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const { data, refetch } = trpc.useQuery([
    "recommendations.getRecommendations",
  ]);

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
      <div className="col-start-1 col-span-12 md:col-start-2 md:col-span-9 lg:col-start-4 lg:col-span-6 flex flex-col">
        <div>
          <RecommendationsForm onCreate={refetch} />
        </div>
        <div>
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
      </div>
    </PageWrap>
  );
};

export default Recommendations;
