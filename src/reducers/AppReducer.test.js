import reducer, { addVoteToUser, addIdeaToUser } from './AppReducer'
import { getMockState } from 'src/mocks'

describe('AppReducer', () => {
  let idea
  let state

  beforeEach(() => {
    idea = { title: 'some idea', description: 'some other idea' }
    state = getMockState()
  })

  afterEach(() => {
    idea = null
    state = null
  })

  describe('addVoteToUser', () => {
    it('should add vote to user', () => {
      expect(addVoteToUser({ votes: [] }, 1)).toEqual({
        votes: [1]
      })
    })
  })

  describe('addIdeaToUser', () => {
    it('should add idea to user', () => {
      expect(addIdeaToUser({ ideas: [] }, 1)).toEqual({
        ideas: [1]
      })
    })
  })

  it('should add new idea', () => {
    const newState = reducer(state, { type: 'ADD_IDEA', payload: idea })
    expect(newState.user.ideas).toHaveLength(1) // Should add idea to user
    expect(newState.ideas).toHaveLength(3) // Should add idea to state
    expect(newState.ideas.find(i => i._id === '2')).toEqual({
      _id: '2', // Should add correct id to ideas
      ...idea,
      votes: 0, // Should add votes to idea
      user: state.user._id // Should add user to idea
    })
  })

  it('should upvote an idea', () => {
    const newState = reducer(state, { type: 'UPVOTE_IDEA', payload: 0 })
    expect(newState.user.votes).toContain(0)
    expect(newState.ideas.find(i => i._id === 0).votes).toEqual(1)
  })

  it('should downvote an idea', () => {
    const newState = reducer(state, { type: 'DOWNVOTE_IDEA', payload: 1 })
    expect(newState.user.votes).toContain(1)
    expect(newState.ideas.find(i => i._id === 1).votes).toEqual(4)
  })
})
