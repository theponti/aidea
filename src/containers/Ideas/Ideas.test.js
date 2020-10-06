import { render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { Ideas } from 'src/containers/Ideas'
import { getMockState, getMockUserState } from 'src/mocks'
import { getIdeas } from 'src/providers/Amplify'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes, appStates } from 'src/reducers/action-types'

describe('<Ideas/>', () => {
  it('should render ideas', async () => {
    const state = getMockState()
    const user = getMockUserState()
    const dispatch = jest.fn()

    getIdeas.mockReturnValue(state.ideas)

    await act(async () => {
      render(
        <IdeasContext.Provider value={{
          state: {
            ideas: undefined,
            status: appStates.LOADING,
            error: null
          },
          dispatch
        }}>
          <UserContext.Provider value={{ user }}>
            <Ideas/>
          </UserContext.Provider>
        </IdeasContext.Provider>
      )
    })

    expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.FETCH_IDEAS })
    expect(getIdeas).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({ type: actionTypes.FETCH_IDEAS_SUCCESS, payload: state.ideas })
  })

  it('should render ideas', () => {
    const state = getMockState()
    const user = getMockUserState()
    const dispatch = jest.fn()
    const { container } = render(
      <IdeasContext.Provider value={{ state, dispatch }}>
        <UserContext.Provider value={{ user }}>
          <Ideas/>
        </UserContext.Provider>
      </IdeasContext.Provider>
    )
    expect(container).toHaveTextContent('Foo idea')
    expect(container).toHaveTextContent('Bar idea')
  })
})
