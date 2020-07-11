import reducer from './AppReducer'
import { getMockState } from 'src/mocks'
import { actionTypes } from './action-types'

describe('AppReducer', () => {
  let idea: any
  let state: any

  beforeEach(() => {
    idea = { title: 'some idea', description: 'some other idea' }
    state = getMockState()
  })

  afterEach(() => {
    idea = null
    state = null
    jest.resetAllMocks()
  })

  it('should add new idea', () => {
    const newState = reducer(state, { type: 'ADD_IDEA', payload: idea })
    expect(newState).toEqual({ ...state, status: actionTypes.LOADING })
  })

  it('should upvote an idea', () => {
    const ideaID = '0'
    const newState = reducer(state, { type: 'UPVOTE_IDEA', payload: ideaID })
    expect(newState).toEqual({ ...state, status: actionTypes.LOADING })
  })

  it('should downvote an idea', () => {
    const ideaID = '0'
    const newState = reducer(state, { type: 'DOWNVOTE_IDEA', payload: ideaID })
    expect(newState).toEqual({ ...state, status: actionTypes.LOADING })
  })
})
