function voteOnIdea(ideas, id, amount) {
  return ideas.map(idea => {
    if (idea._id !== id) return idea
    return { ...idea, votes: idea.votes + amount }
  })
}

export default (state, action) => {
  switch(action.type) {
    case 'ADD_IDEA':
      return {
        ideas: [...state.ideas, { ...action.payload, _id: state.ideas.length }]
      }
    case 'DOWNVOTE_IDEA':
      return { 
        ideas: voteOnIdea(state.ideas, action.payload, -1)
      }
    case 'UPVOTE_IDEA':
      return { 
        ideas: voteOnIdea(state.ideas, action.payload, 1)
      }
    default:
      return state
  }
}