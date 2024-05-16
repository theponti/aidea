import { api } from "@/lib/trpc/react";
import { ListInvite } from "@prisma/client";
import { SyntheticEvent, useCallback, useState } from "react";

type UseListInviteFormProps = {
  onCreate: (invite: ListInvite) => void;
};
export default function useListInviteForm({
  onCreate,
}: UseListInviteFormProps) {
  const mutation = api.lists.invite.useMutation();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const onEmailChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    setError(undefined);
  }, []);

  const createListInvite = useCallback(
    async ({ listId }: { listId: string }) => {
      try {
        setIsLoading(true);
        setError(undefined);
        const invite = await mutation.mutateAsync({
          email,
          listId,
        });
        setEmail("");
        setIsLoading(false);
        onCreate(invite);
      } catch (err) {
        setError("The invite couldn't be sent. Try again later.");
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
    onEmailChange,
  };
}
