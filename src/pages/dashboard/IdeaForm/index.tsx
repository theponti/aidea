import { SyntheticEvent, useCallback, useState } from "react";
import AlertError from "src/components/AlertError";
import { trpc } from "src/utils/trpc";

type UseIdeaFormProps = {
  onCreate: () => void;
};
function useIdeaForm({ onCreate }: UseIdeaFormProps) {
  const mutation = trpc.useMutation("idea.createIdea");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | undefined>();
  const onDescriptionChange = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) =>
      setDescription(e.currentTarget.value),
    []
  );

  const createIdea = useCallback(async () => {
    try {
      await mutation.mutateAsync({
        description,
      });
      setDescription("");
      onCreate();
    } catch (err) {
      setError("Your idea could not be saved. Try again later.");
    }
  }, [description, mutation, onCreate]);

  return {
    description,
    error,
    createIdea,
    onDescriptionChange,
  };
}

type IdeaFormProps = {
  onCreate: () => void;
};
export default function IdeaForm({ onCreate }: IdeaFormProps) {
  const { error, description, createIdea, onDescriptionChange } = useIdeaForm({
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
        <div className="form-control w-full mb-8">
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
        <button className="btn btn-success float-right">Submit</button>
      </form>
    </>
  );
}
