import { Idea } from "@prisma/client";
import classNames from "classnames";
import React, { useCallback } from "react";

import { api } from "@/lib/trpc/react";
import Trash from "components/Icons/Trash";

type IdeaListItemProps = {
  idea: Idea;
};
function IdeaListItem({ idea }: IdeaListItemProps) {
  const mutation = api.idea.deleteIdea.useMutation();

  const deleteIdea = useCallback(async () => {
    await mutation.mutateAsync({ id: idea.id });
  }, [idea.id, mutation]);

  return (
    <li
      key={idea.id}
      className="border-y-zinc-900 border-b-2 pt-4 pb-2 text-primary grid grid-cols-12"
    >
      <p className="col-start-7 col-span-6 md:col-start-10 md:col-span-3 text-end text-zinc-500">
        {idea.createdAt.toISOString().split("T")[0]}
      </p>
      <p className="row-start-2 col-span-12 whitespace-pre-wrap">
        {idea.description}
      </p>
      <button
        className={classNames(
          "btn btn-ghost col-start-12 flex justify-end text-red-500",
          mutation.isPending && "loading",
        )}
        onClick={deleteIdea}
      >
        {!mutation.isPending && <Trash />}
      </button>
    </li>
  );
}

export default React.memo(IdeaListItem);
