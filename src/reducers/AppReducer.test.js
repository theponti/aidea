import reducer from './AppReducer'

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
  
  it('should add new idea', () => {
    const newState = reducer({ ideas: [{}] }, { type: 'ADD_IDEA', payload: idea })
    expect(newState).toEqual({ ideas: [{}, { _id: 1, ...idea, votes: 0 }] })
  })
  
  it('should upvote an idea', () => {
    let state = { 
      ideas: [
        { _id: 0, title: 'some idea', description: 'some other idea', votes: 0 }
      ] 
    }
    const newState = reducer(state, { type: 'UPVOTE_IDEA', payload: 0 })
    expect(newState).toEqual({ ideas: [{ _id: 0, ...idea, votes: 1 }] })
  })
  
  it('should downvote an idea', () => {
    const state = {
      ideas: [
        { _id: 0, title: 'some idea', description: 'some other idea', votes: 3 }
      ]
    }
    const newState = reducer(state, { type: 'DOWNVOTE_IDEA', payload: 0 })
    expect(newState).toEqual({ ideas: [{ _id: 0, ...idea, votes: 2 }] })
  })
})