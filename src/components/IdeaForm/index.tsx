import classNames from "classnames";
import { SyntheticEvent, useCallback, useState } from "react";
import AlertError from "src/components/AlertError";
import { trpc } from "src/utils/trpc";

type UseIdeaFormProps = {
  onCreate: () => void;
};
function useIdeaForm({ onCreate }: UseIdeaFormProps) {
  const mutation = trpc.useMutation("idea.createIdea");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();
  const onDescriptionChange = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) => {
      setDescription(e.currentTarget.value);
      setError(undefined);
    },
    []
  );

  const createIdea = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await mutation.mutateAsync({
        description,
      });
      setIsLoading(false);
      setDescription("");
      onCreate();
    } catch (err) {
      setError("Your idea could not be saved. Try again later.");
    }
  }, [description, mutation, onCreate]);

  return {
    description,
    error,
    isLoading,
    createIdea,
    onDescriptionChange,
  };
}

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
        <div className="form-control w-full mb-4">
          <label className="label hidden">
            <span className="label-text">Description</span>
          </label>
          <textarea
            placeholder="What's happening?"
            className="textarea textarea-bordered w-full text-lg"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
        <button
          className={classNames(
            "btn btn-success float-right min-w-full",
            isLoading && "loading"
          )}
        >
          Submit
        </button>
      </form>
    </>
  );
}
