import { useContext, useEffect, useState } from "react";
import {
  actionTypes,
  getIdeas,
  voteOnIdea
} from "src/services/ideas/ideas.ducks";
import { IdeasContext } from "src/services/ideas/ideas.provider";

export function useVoteOnIdea() {
  const { dispatch } = useContext(IdeasContext);
  const [error, setError] = useState(null);

  async function vote(_id, score) {
    dispatch({ type: actionTypes.IDEA_UPDATE });

    try {
      await voteOnIdea(_id, score);
      dispatch({ type: actionTypes.IDEA_UPDATE_SUCCESS });
    } catch (err) {
      setError(err.message);
      dispatch({ type: actionTypes.IDEA_UPDATE_ERROR, payload: err.message });
    }
  }

  return {
    error,
    vote,
  };
}

export function useIdeas() {
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
