"use client";

import { trpc } from "@/lib/trpc";
import classNames from "classnames";
import AlertError from "components/AlertError";
import { SyntheticEvent, useCallback, useState } from "react";

type BookmarksFormProps = {
  onCreate: () => void;
};
export default function BookmarksForm({ onCreate }: BookmarksFormProps) {
  const { isPending, isError, mutateAsync } = trpc.bookmarks.create.useMutation(
    { onSuccess: onCreate },
  );
  const [url, setUrl] = useState("");

  const onUrlChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
  }, []);

  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutateAsync({ url });
    },
    [mutateAsync, url],
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
            value={url}
            onChange={onUrlChange}
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
