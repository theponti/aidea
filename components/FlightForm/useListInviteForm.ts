import { api } from "@/lib/trpc/react";
import { SyntheticEvent, useCallback, useState } from "react";

type UseListInviteFormProps = {
  onCreate: () => void;
};
export default function useListInviteForm({
  onCreate,
}: UseListInviteFormProps) {
  const mutation = api.lists.invite.useMutation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const onNameChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setError(undefined);
  }, []);

  const createListInvite = useCallback(
    async ({ listId }: { listId: string }) => {
      try {
        setIsLoading(true);
        setError(undefined);
        await mutation.mutateAsync({
          email,
          listId,
        });
        setEmail("");
        setIsLoading(false);
        onCreate();
      } catch (err) {
        setError("The list could not be create. Try again later.");
        setIsLoading(false);
      }
    },
    [email, mutation, onCreate],
  );

  return {
    error,
    isLoading,
    email,
    createListInvite,
    onNameChange,
  };
}
