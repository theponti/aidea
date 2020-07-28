import { IdeasState } from 'src/interfaces/Idea'
import { actionTypes as actions, appStates as states } from './action-types'

const AppReducer = ({ ideas = [] }: IdeasState, action: { type: string, payload: any }): IdeasState => {
  switch (action.type) {
    case actions.FETCH_IDEAS:
      return { ideas, status: states.LOADING, error: null }
    case actions.FETCH_IDEAS_SUCCESS:
      return { status: states.LOADED, ideas: action.payload, error: null }
    case actions.FETCH_IDEAS_ERROR:
      return { status: states.LOADED, ideas, error: action.payload }

    case actions.IDEA_UPDATE:
      return { ideas, status: states.LOADING }
    case actions.IDEA_UPDATE_SUCCESS:
      return { ideas, status: states.LOADED, error: null }
    case actions.IDEA_UPDATE_ERROR:
      return { ideas, status: states.LOADED, error: action.payload }

    default:
      return { ideas, status: states.LOADED, error: null }
  }
}

export default AppReducer
