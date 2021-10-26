import { actionTypes as actions } from "../actions";

const AppReducer = (state, action) => {
  switch (action.type) {
    case actions.FETCH_IDEAS:
      return { ...state, isLoading: true, error: null };
    case actions.FETCH_IDEAS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ideas: action.payload,
        error: null,
      };
    case actions.FETCH_IDEAS_ERROR:
      return { ...state, isLoading: false, error: action.payload };

    case actions.IDEA_UPDATE:
      return { ...state, isLoading: true };
    case actions.IDEA_UPDATE_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case actions.IDEA_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return { ...state, isLoading: true, error: null };
  }
};

export default AppReducer;
