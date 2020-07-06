import { actionTypes as actions } from './action-types'

export function addIdeaToUser (user, id) {
  user.ideas.push(id)
  return user
}

export function addVoteToUser (user, id) {
  user.votes.push(id)
  return user
}

export function voteOnIdea (ideas, id, amount) {
  return ideas.map(idea => {
    if (idea._id !== id) return idea
    return { ...idea, votes: idea.votes + amount }
  })
}

export default (state, action) => {
  switch (action.type) {
    case actions.ADD_IDEA:
      return {
        ...state,
        user: addIdeaToUser(state.user, state.ideas.length + ''),
        ideas: [
          ...state.ideas,
          {
            _id: state.ideas.length + '',
            votes: 0,
            user: state.user._id,
            ...action.payload
          }
        ]
      }
    case actions.DOWNVOTE_IDEA:
      return {
        ...state,
        user: addVoteToUser(state.user, action.payload),
        ideas: voteOnIdea(state.ideas, action.payload, -1)
      }
    case actions.UPVOTE_IDEA:
      return {
        ...state,
        user: addVoteToUser(state.user, action.payload),
        ideas: voteOnIdea(state.ideas, action.payload, 1)
      }
    default:
      return state
  }
}
