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
            placeholder="enter url"
            className="textarea w-full text-lg p-2 bg-zinc-900"
            value={url}
            onChange={onUrlChange}
          />
        </div>
        {!!url.length && (
          <button
            className={classNames(
              "btn btn-primary float-right min-w-full mb-4",
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
