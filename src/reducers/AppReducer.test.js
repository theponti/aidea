import reducer, { addVoteToUser, addIdeaToUser } from './AppReducer'
import { getMockState } from 'src/mocks'

describe('AppReducer', () => {
  let idea
  let state
  
  beforeEach(() => {
    idea = { title: 'some idea', description: 'some other idea' }
    state = {
      ideas: [
        { ...idea, _id: 0, votes: 0 }
      ]
    }
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
    const state = getMockState()
    const newState = reducer(state, { type: 'ADD_IDEA', payload: idea })
    expect(newState.user.ideas).toContain(2)
    expect(newState.ideas.find(i => i._id === 2)).toEqual({ 
      _id: 2, 
      ...idea, 
      votes: 0, 
      user: state.user._id
    })
  })
  
  it('should upvote an idea', () => {
    let state = getMockState()
    const newState = reducer(state, { type: 'UPVOTE_IDEA', payload: 0 })
    expect(newState.user.votes).toContain(0)
    expect(newState.ideas.find(i => i._id === 0).votes).toEqual(1)
  })
  
  it('should downvote an idea', () => {
    const state = getMockState()
    const newState = reducer(state, { type: 'DOWNVOTE_IDEA', payload: 1 })
    expect(newState.user.votes).toContain(1)
    expect(newState.ideas.find(i => i._id === 1).votes).toEqual(4)
  })
})