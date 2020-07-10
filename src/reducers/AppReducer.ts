import { actionTypes as actions, actionTypes } from './action-types'
import { IdeasState } from 'src/interfaces/Idea'

const AppReducer = ({ ideas }: IdeasState, action: { type: string, payload: any }): IdeasState => {
  switch (action.type) {
    case actions.ADD_IDEA:
      return { ideas, status: actionTypes.LOADING }
      // await addIdeaToUser(ideaID)
    case actions.DOWNVOTE_IDEA:
      return { ideas, status: actionTypes.LOADING }
      // await addVoteToUser(action.payload)
      // await addVoteToIdea(action.payload, -1)
    case actions.UPVOTE_IDEA:
      return { ideas, status: actionTypes.LOADING }
      // await addVoteToUser(action.payload)
      // await addVoteToIdea(action.payload, 1)
    default:
      return { ideas, status: actionTypes.LOADED }
  }
}

export default AppReducer
