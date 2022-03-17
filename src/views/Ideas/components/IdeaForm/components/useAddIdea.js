import { useCallback, useState } from "react";
import { actionTypes, saveIdea } from "src/services/ideas/ideas.ducks";

export function useAddIdea({ dispatch }) {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  const onDescriptionChange = useCallback(
    (e) => setDescription(e.target.value),
    []
  );
  const onTitleChange = useCallback((e) => setTitle(e.target.value), []);

  const reset = useCallback(() => {
    setDescription("");
    setTitle("");
  }, []);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const idea = await saveIdea({ description, title });
        dispatch({ type: actionTypes.ADD_IDEA_SUCCESS, payload: idea });
        reset(); // Clear values from form
      } catch (e) {
        dispatch({ type: actionTypes.ADD_IDEA_ERROR });
      }
    },
    [description, dispatch, reset, title]
  );

  return {
    description,
    onSubmit,
    onDescriptionChange,
    onTitleChange,
    reset,
    title,
  };
}
