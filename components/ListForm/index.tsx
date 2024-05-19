"use client";

import { api } from "@/lib/trpc/react";
import classNames from "classnames";
import AlertError from "components/AlertError";
import { SyntheticEvent, useCallback, useState } from "react";

export default function ListForm() {
  const [name, setName] = useState("");
  const { mutate, isError, isPending } = api.lists.create.useMutation();
  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutate({ name });
    },
    [mutate, name],
  );

  return (
    <>
      {isError && <AlertError error="There was an issue creating the list." />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">Name of list</span>
          </label>
          <input
            type="text"
            placeholder="What should we call this list?"
            className="input w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {!!name.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4 rounded text-white",
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
