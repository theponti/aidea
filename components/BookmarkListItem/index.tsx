import { Recommendation } from "@prisma/client";
import classNames from "classnames";
import Trash from "components/Icons/Trash";
import React, { SyntheticEvent, useCallback } from "react";

import { api } from "@/lib/trpc/react";
import styles from "./BookmarkListItem.module.css";

type BookmarkListItemProps = {
  bookmark: Recommendation;
  onDelete: () => void;
};
function BookmarkListItem({ bookmark, onDelete }: BookmarkListItemProps) {
  const { id, image, title, siteName, url } = bookmark;
  const mutation = api.bookmarks.delete.useMutation();
  const { isPending } = mutation;

  const deleteIdea = useCallback(
    async (e: SyntheticEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      await mutation.mutateAsync({ id });
      onDelete();
    },
    [id, mutation, onDelete],
  );

  return (
    <li className={styles["list-item"]}>
      <figure className="h-[150px] md:h-[100%] md:w-[200px] flex justify-center overflow-hidden rounded-t-md md:rounded-t-none md:rounded-l">
        {/* To support all possible og images, we aren't using Next Image */}
        {/* eslint-disable-next-line */}
        <img alt={title} src={image} className="object-cover min-w-full" />
      </figure>
      <div className="flex-1 flex flex-col px-4 pt-4 pb-2 bg-white rounded-b-md md:rounded-b-none md:rounded-r-md">
        <h2 className="flex flex-col min-w-full">
          <span className="text-primary text-lg md:text-xl md:justify-start md:flex-1">
            {title ? title : siteName}
          </span>
          {title && (
            <a
              className="flex text-xs text-blue-300"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              {siteName} 🔗
            </a>
          )}
        </h2>
        <p className="flex-1" />
        <div className="flex justify-end items-end">
          <button
            className={classNames("btn btn-ghost", isPending && "loading")}
            onClick={deleteIdea}
          >
            {!isPending && <Trash className="text-red-700" />}
          </button>
        </div>
      </div>
    </li>
  );
}

export default React.memo(BookmarkListItem);
