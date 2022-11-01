import classNames from "classnames";
import { SyntheticEvent, useCallback } from "react";
import AlertError from "src/components/AlertError";
import useRecommendationsForm from "./useRecommendationsForm";

type RecommendationsFormProps = {
  onCreate: () => void;
};
export default function RecommendationsForm({
  onCreate,
}: RecommendationsFormProps) {
  const { error, isLoading, url, createRecommendation, onUrlChange } =
    useRecommendationsForm({
      onCreate,
    });
  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      createRecommendation();
    },
    [createRecommendation]
  );

  return (
    <>
      {error && <AlertError error={error} />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">URL</span>
          </label>
          <input
            type="url"
            placeholder="Paste link here"
            className="textarea w-full text-lg p-2 border-stone-300 rounded placeholder:text-zinc-400"
            value={url}
            onChange={onUrlChange}
          />
        </div>
        {!!url.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4 rounded text-white",
              isLoading && "loading"
            )}
          >
            Submit
          </button>
        )}
      </form>
    </>
  );
}
