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
    <li className="text-primary font-mono grid grid-cols-12">
      <div className="col-span-12 card card-side glass shadow-xl">
        <figure>
          <img
            alt={title}
            src={image}
            className="h-[190px] w-[200px] m-w-[200px]"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title ? title : siteName}</h2>
          <div className="card-actions justify-end items-center">
            <div className="mr-4">
              {title && (
                <a className="text-xs text-blue-300" href={url}>
                  {siteName} 🔗
                </a>
              )}
            </div>
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
      </div>
    </li>
  );
}

export default React.memo(RecommendationListItem);
