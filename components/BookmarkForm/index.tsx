"use client";

import { api } from "@/lib/trpc/react";
import classNames from "classnames";
import AlertError from "components/AlertError";
import { url } from "inspector";
import { SyntheticEvent, useCallback } from "react";

type BookmarksFormProps = {
  onCreate?: () => void;
};
export default function BookmarksForm({ onCreate }: BookmarksFormProps) {
  const { isPending, isError, mutateAsync } = api.bookmarks.create.useMutation({
    onSuccess: onCreate,
  });

  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutateAsync({ url: e.currentTarget.url.value });
    },
    [mutateAsync],
  );

  return (
    <>
      {isError && (
        <AlertError error="There was an issue creating this bookmark." />
      )}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">URL</span>
          </label>
          <input
            type="url"
            placeholder="Add bookmark url"
            className="input w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
          />
        </div>
        {!!url.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4 rounded text-white",
              { loading: isPending },
            )}
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
