import BookmarksForm from "@/components/BookmarkForm";
import BookmarkListItem from "components/BookmarkListItem";
import { trpc } from "lib/trpc";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "server/common/get-server-auth-session";

export default async function Bookmarks() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  try {
    const { data: bookmarks } = trpc.bookmarks.get.useQuery();

    return (
      <>
        <BookmarksForm onCreate={() => revalidatePath("/bookmarks")} />
        <div>
          {bookmarks?.length === 0 && "your bookmarks will appear here"}
          {bookmarks && bookmarks.length > 0 && (
            <ul className="space-y-2">
              {bookmarks.map((bookmark) => (
                <BookmarkListItem
                  key={bookmark.id}
                  bookmark={bookmark}
                  onDelete={() => revalidatePath("/bookmarks")}
                />
              ))}
            </ul>
          )}
        </div>
      </>
    );
  } catch (error) {
    console.log(error);
    return <div>There was an issue loading your bookmarks.</div>;
  }
}
