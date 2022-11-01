import { Recommendation } from "@prisma/client";
import classNames from "classnames";
import React, { useCallback } from "react";
import Trash from "src/components/Icons/Trash";
import { trpc } from "src/utils/trpc";

type RecommendationListItemProps = {
  recommendation: Recommendation;
  onDelete: () => void;
};
function RecommendationListItem({
  recommendation,
  onDelete,
}: RecommendationListItemProps) {
  const { id, image, title, siteName, url } = recommendation;
  const mutation = trpc.useMutation(["idea.deleteIdea"]);

  const deleteIdea = useCallback(async () => {
    await mutation.mutateAsync({ id });
    onDelete();
  }, [id, mutation, onDelete]);

  return (
    <li className="text-primary bg-zinc-900 shadow-xl font-mono flex min-w-full rounded">
      <figure className="h-[150px] w-[150px] min-w-[150px] md:h-[200px] md:w-[200px] flex justify-center overflow-x-hidden">
        {/* To support all possible og images, we aren't using Next Image */}
        {/* eslint-disable-next-line */}
        <img alt={title} src={image} className="max-w-none" />
      </figure>
      <div className="flex-1 flex flex-col px-4 pt-4 pb-2">
        <h2 className="flex flex-col flex-1 md:flex-row md:items-start">
          <span className="text-neutral-content text-lg md:text-xl">
            {title ? title : siteName}
          </span>
          <div className="flex flex-1 md:justify-end">
            {title && (
              <a className="text-xs text-blue-300" href={url}>
                {siteName} 🔗
              </a>
            )}
          </div>
        </h2>
        <div className="card-actions justify-end items-end">
          <button
            className={classNames(
              "btn btn-ghost text-red-500",
              mutation.isLoading && "loading"
            )}
            onClick={deleteIdea}
          >
            {!mutation.isLoading && <Trash />}
          </button>
        </div>
      </div>
    </li>
  );
}

export default React.memo(RecommendationListItem);
