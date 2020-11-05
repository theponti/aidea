import { actionTypes as actions } from 'src/actions'
import { IdeasState } from 'src/interfaces/Idea'

const initialState = {
  ideas: [],
  isLoading: true
}

interface AppReducerAction {
  type: String;
  payload: any;
}

const AppReducer = (
  state: IdeasState = initialState,
  action: AppReducerAction
): IdeasState => {
  switch (action.type) {
    case actions.FETCH_IDEAS:
      return { ...state, isLoading: true, error: null }
    case actions.FETCH_IDEAS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ideas: action.payload,
        error: null
      }
    case actions.FETCH_IDEAS_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    case actions.IDEA_UPDATE:
      return { ...state, isLoading: true }
    case actions.IDEA_UPDATE_SUCCESS:
      return { ...state, isLoading: false, error: null }
    case actions.IDEA_UPDATE_ERROR:
      return { ...state, isLoading: false, error: action.payload }

    default:
      return { ...state, isLoading: true, error: null }
  }
}

export default AppReducer
