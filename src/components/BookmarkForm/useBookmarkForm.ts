import { SyntheticEvent, useCallback, useState } from "react";
import { trpc } from "src/utils/trpc";

type UseBookmarkFormProps = {
  onCreate: () => void;
};
export default function useBookmarkForm({ onCreate }: UseBookmarkFormProps) {
  const mutation = trpc.bookmarks.create.useMutation();
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const onUrlChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
    setError(undefined);
  }, []);

  const createBookmark = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(undefined);
      await mutation.mutateAsync({
        url,
      });
      setUrl("");
      setIsLoading(false);
      onCreate();
    } catch (err) {
      setError("OG could not be generated. Try again later.");
      setIsLoading(false);
    }
  }, [url, mutation, onCreate]);

  return {
    error,
    isLoading,
    url,
    createBookmark,
    onUrlChange,
  };
}
