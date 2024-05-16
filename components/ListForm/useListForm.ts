import { trpc } from "lib/trpc";
import { SyntheticEvent, useCallback, useState } from "react";

type UseListFormProps = {
  onCreate: () => void;
};
export default function useListForm({ onCreate }: UseListFormProps) {
  const mutation = trpc.lists.create.useMutation();
  const [name, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const onNameChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
    setError(undefined);
  }, []);

  const createList = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await mutation.mutateAsync({
        name,
      });
      setUrl("");
      setIsLoading(false);
      onCreate();
    } catch (err) {
      setError("The list could not be create. Try again later.");
      setIsLoading(false);
    }
  }, [name, mutation, onCreate]);

  return {
    error,
    isLoading,
    name,
    createList,
    onNameChange,
  };
}
