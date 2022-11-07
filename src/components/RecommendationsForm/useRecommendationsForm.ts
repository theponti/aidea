import { SyntheticEvent, useCallback, useState } from "react";
import { trpc } from "src/utils/trpc";

type UseRecommendationsFormProps = {
  onCreate: () => void;
};
export default function useRecommendationsForm({
  onCreate,
}: UseRecommendationsFormProps) {
  const mutation = trpc.useMutation("recommendations.createRecommendation");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>();
  const [error, setError] = useState<string | undefined>();

  const onUrlChange = useCallback((e: SyntheticEvent<HTMLInputElement>) => {
    setUrl(e.currentTarget.value);
    setError(undefined);
  }, []);

  const createRecommendation = useCallback(async () => {
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
    createRecommendation,
    onUrlChange,
  };
}
