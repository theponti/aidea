export const actionTypes = {
  ADD_IDEAS: "ideas/add",
  ADD_IDEA_ERROR: "ideas/add/error",
  ADD_IDEA_SUCCESS: "ideas/add/success",
  FETCH_IDEAS: "ideas/fetch",
  FETCH_IDEAS_ERROR: "ideas/fetch/error",
  FETCH_IDEAS_SUCCESS: "ideas/fetch/success",
  IDEA_UPDATE: "ideas/update",
  IDEA_UPDATE_ERROR: "ideas/update/error",
  IDEA_UPDATE_SUCCESS: "ideas/update/success",
};

/**
 * @param {string} id
 * @param {number} score
 */
export function addVoteToIdea() {}

export async function getIdeas() {
  return [];
}

export function saveIdea() {}

export const ideasReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FETCH_IDEAS:
      return { ...state, isLoading: true, error: null };
    case actionTypes.FETCH_IDEAS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ideas: action.payload,
        error: null,
      };
    case actionTypes.FETCH_IDEAS_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case actionTypes.IDEA_UPDATE:
      return { ...state, isLoading: true };
    case actionTypes.IDEA_UPDATE_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case actionTypes.IDEA_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return { ...state, isLoading: true, error: null };
  }
};
