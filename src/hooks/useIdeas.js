import { actionTypes, getIdeas } from "@aidea/actions";
import { IdeasContext } from "@aidea/providers/IdeasProvider";
import { useContext, useEffect } from "react";

export default function useIdeas() {
  const { state, dispatch } = useContext(IdeasContext);
  const { ideas, error, isLoading } = state;

  useEffect(() => {
    async function fetchData() {
      dispatch({ type: actionTypes.FETCH_IDEAS });

      try {
        const ideas = await getIdeas();
        dispatch({ type: actionTypes.FETCH_IDEAS_SUCCESS, payload: ideas });
      } catch (error) {
        dispatch({ type: actionTypes.FETCH_IDEAS_ERROR, error: error.message });
      }
    }

    fetchData();
  }, [dispatch]);

  return { isLoading, ideas, error };
}
