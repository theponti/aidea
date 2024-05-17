"use client";

import classNames from "classnames";
import { SyntheticEvent, useCallback, useState } from "react";

import { api } from "@/lib/trpc/react";
import AlertError from "components/AlertError";

export default function IdeaForm() {
  const [description, setDescription] = useState("");
  const { isError, isPending, mutate } = api.idea.createIdea.useMutation();

  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({ description });
    },
    [mutate, description],
  );

  return (
    <>
      {isError && <AlertError error="There was an issue saving your idea." />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="What's happening?"
            className="textarea w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>
        {!!description.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4",
              isPending && "loading",
            )}
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
