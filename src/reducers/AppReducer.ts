import { IdeasState } from 'src/interfaces/Idea'
import { actionTypes as actions, actionTypes } from './action-types'

const AppReducer = ({ ideas }: IdeasState, action: { type: string, payload: any }): IdeasState => {
  switch (action.type) {
    case actions.FETCH_IDEAS:
      return { ideas, status: actionTypes.LOADING, error: undefined }
    case actions.FETCH_SUCCESS:
      return { status: actionTypes.LOADED, ideas: action.payload, error: undefined }
    case actions.FETCH_ERROR:
      return { status: actionTypes.LOADED, ideas, error: action.payload }

    case actions.ADD_IDEA:
      return { ideas, status: actionTypes.LOADING }
    case actions.DOWNVOTE_IDEA:
      return { ideas, status: actionTypes.LOADING }
    case actions.UPVOTE_IDEA:
      return { ideas, status: actionTypes.LOADING }
    default:
      return { ideas, status: actionTypes.LOADED }
  }
}

export default AppReducer
