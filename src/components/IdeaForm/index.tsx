import classNames from "classnames";
import { SyntheticEvent, useCallback } from "react";
import AlertError from "src/components/AlertError";
import useIdeaForm from "./useIdeasForm";

type IdeaFormProps = {
  onCreate: () => void;
};
export default function IdeaForm({ onCreate }: IdeaFormProps) {
  const { error, description, isLoading, createIdea, onDescriptionChange } =
    useIdeaForm({
      onCreate,
    });

  const onFormSubmit = useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      createIdea();
    },
    [createIdea]
  );

  return (
    <>
      {error && <AlertError error={error} />}

      <form onSubmit={onFormSubmit}>
        <div className="form-control w-full mb-2">
          <label className="label hidden">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="What's happening?"
            className="textarea w-full text-lg max-h-24 p-2 bg-secondary"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
        {!!description.length && (
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
