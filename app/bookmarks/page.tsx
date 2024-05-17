import { redirect } from "next/navigation";

// import BookmarksForm from "@/components/BookmarkForm";
import Bookmarks from "@/components/bookmarks";
import { getServerAuthSession } from "@/server/auth";

export default async function BookmarksPage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl">Bookmarks</h1>
      {/* <BookmarksForm /> */}
      <Bookmarks />
    </div>
  );
}
