"use client";

import BookmarkListItem from "@/components/BookmarkListItem";
import { api } from "@/lib/trpc/react";
import { Loader } from "lucide-react";

export default function Bookmarks({ onDelete }: { onDelete?: () => void }) {
  const { data: bookmarks, isError, isPending } = api.bookmarks.get.useQuery();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader className="animate-spin-slow" />
      </div>
    );
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
