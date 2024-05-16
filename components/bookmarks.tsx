"use client";

import BookmarkListItem from "@/components/BookmarkListItem";
import LoadingScene from "@/components/Loading";
import { api } from "@/lib/trpc/react";

export default function Bookmarks({ onDelete }: { onDelete?: () => void }) {
  const { data: bookmarks, isError, isPending } = api.bookmarks.get.useQuery();

  if (isPending) {
    return <LoadingScene />;
  }

  if (isError) {
    return <div>There was an issue loading your bookmarks.</div>;
  }

  return (
    <div>
      {bookmarks?.length === 0 && "your bookmarks will appear here"}
      {bookmarks && bookmarks.length > 0 && (
        <ul className="space-y-2">
          {bookmarks.map((bookmark) => (
            <BookmarkListItem
              key={bookmark.id}
              bookmark={bookmark}
              onDelete={() => onDelete?.()}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
