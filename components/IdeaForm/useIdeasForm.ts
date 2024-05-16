import { SyntheticEvent, useCallback, useState } from "react";

import { api } from "@/lib/trpc/react";

type UseIdeaFormProps = {
  onCreate: () => void;
};
export default function useIdeaForm({ onCreate }: UseIdeaFormProps) {
  const mutation = api.idea.createIdea.useMutation();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();
  const onDescriptionChange = useCallback(
    (e: SyntheticEvent<HTMLTextAreaElement>) => {
      setDescription(e.currentTarget.value);
      setError(undefined);
    },
    [],
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
      setIsLoading(false);
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
