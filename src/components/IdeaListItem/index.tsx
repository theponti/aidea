import { Idea } from "@prisma/client";
import classNames from "classnames";
import React, { useCallback } from "react";
import Trash from "src/components/Icons/Trash";
import { trpc } from "src/utils/trpc";

type IdeaListItemProps = {
  idea: Idea;
  onDelete: () => void;
};
function IdeaListItem({ idea, onDelete }: IdeaListItemProps) {
  const mutation = trpc.useMutation(["idea.deleteIdea"]);

  const deleteIdea = useCallback(async () => {
    await mutation.mutateAsync({ id: idea.id });
    onDelete();
  }, [idea.id, mutation, onDelete]);

  return (
    <li
      key={idea.id}
      className="border-green-600 border-2 p-4 rounded text-primary font-mono grid grid-cols-12"
    >
      <p className="col-start-7 col-span-6 md:col-start-10 md:col-span-3 mb-4 text-end text-green-800">
        {idea.createdAt.toISOString().split("T")[0]}
      </p>
      <p className="row-start-2 col-span-12">{idea.description}</p>
      <button
        className={classNames(
          "btn btn-ghost col-start-12 flex justify-end text-red-500",
          mutation.isLoading && "loading"
        )}
        onClick={deleteIdea}
      >
        {!mutation.isLoading && <Trash />}
      </button>
    </li>
  );
}

export default React.memo(IdeaListItem);
