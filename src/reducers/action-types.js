export const actionTypes = {
  ADD_IDEA: 'ADD_IDEA',
  UPVOTE_IDEA: 'UPVOTE_IDEA',
  DOWNVOTE_IDEA: 'DOWNVOTE_IDEA'
}

export function getActions (dispatch) {
  return {
    addIdea (payload) {
      dispatch({ type: actionTypes.ADD_IDEA, payload })
    },

    downvoteIdea (payload) {
      dispatch({ type: actionTypes.DOWNVOTE_IDEA, payload })
    },

    upvoteIdea (payload) {
      dispatch({ type: actionTypes.UPVOTE_IDEA, payload })
    }
  }
}
