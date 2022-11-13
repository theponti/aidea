import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import DashboardNav from "src/components/DashboardNav";
import LoadingScene from "src/components/Loading";

import BookmarkForm from "src/components/BookmarkForm";
import BookmarkListItem from "src/components/BookmarkListItem";
import { trpc } from "src/utils/trpc";

const Recommendations: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const {
    data,
    refetch,
    status: bookmarksStatus,
  } = trpc.useQuery(["bookmarks.get"], { enabled: false });

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
      <BookmarkForm onCreate={refetch} />
      <div>
        {bookmarksStatus === "loading" && <LoadingScene />}
        {data?.length === 0 && "your bookmarks will appear here"}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((bookmark) => (
              <BookmarkListItem
                key={bookmark.id}
                bookmark={bookmark}
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
