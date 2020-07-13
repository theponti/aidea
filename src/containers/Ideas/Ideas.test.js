import { render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { getIdeas } from 'src/context/Firebase'
import { getMockState, getMockUserState } from 'src/mocks'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes } from 'src/reducers/action-types'
import Ideas from '.'

describe('<Ideas/>', () => {
  it('should render ideas', async () => {
    const state = getMockState()
    const { user } = getMockUserState()
    const dispatch = jest.fn()
    let getByText

    getIdeas.mockReturnValue(state.ideas)

    await act(async () => {
      const el = render(
        <IdeasContext.Provider value={{ state: { ideas: undefined }, dispatch }}>
          <UserContext.Provider value={{ user }}>
            <Ideas/>
          </UserContext.Provider>
        </IdeasContext.Provider>
      )
      getByText = el.getByText
    })

    expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.FETCH_IDEAS })
    expect(getIdeas).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.FETCH_SUCCESS, payload: state.ideas })
  })

  it('should render ideas', () => {
    const state = getMockState()
    const { user } = getMockUserState()
    const dispatch = jest.fn()
    const { container } = render(
      <IdeasContext.Provider value={{ state, dispatch }}>
        <UserContext.Provider value={{ user }}>
          <Ideas/>
        </UserContext.Provider>
      </IdeasContext.Provider>
    )
    expect(container).toHaveTextContent('upvotes: 0')
    expect(container).toHaveTextContent('upvotes: 5')
  })
})
