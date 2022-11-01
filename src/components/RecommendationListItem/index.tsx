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
    <li className="text-primary shadow-xl font-mono flex flex-col w-full rounded h-[300px] max-w-[350px] sm:rounded-lg">
      <a className="flex flex-col min-h-full" href={url}>
        <figure className="w-[100%] min-w-[100%] md:h-[200px] md:w-[200px] flex justify-center overflow-hidden rounded-t-md">
          {/* To support all possible og images, we aren't using Next Image */}
          {/* eslint-disable-next-line */}
          <img alt={title} src={image} style={{ transform: "scale(2)" }} />
        </figure>
        <div className="flex-1 flex flex-col px-4 pt-4 pb-2">
          <h2 className="flex flex-col flex-1 md:flex-row items-center">
            <span className="text-primary text-lg md:text-xl md:justify-start">
              {title ? title : siteName}
            </span>
            {title && (
              <span className="flex flex-1 md:justify-end items-center text-xs text-blue-300">
                {siteName} 🔗
              </span>
            )}
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
      </a>
    </li>
  );
}

export default React.memo(RecommendationListItem);
