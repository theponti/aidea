import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { Dispatch } from 'react'
import { Idea } from 'src/interfaces/Idea'
import { getMockState, getMockUserState } from 'src/mocks'
import { addVote } from 'src/providers/Amplify'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes } from 'src/reducers/action-types'
import IdeaListItem from '.'

describe('<IdeaListItem/>', () => {
  let idea: Idea
  let user: any
  let dispatch: Dispatch<any>
  let ideas: Idea[]

  const IdeasProvider: React.FC = ({ children }) => (
    <IdeasContext.Provider value={{ state: { ideas }, dispatch }}>
      {children}
    </IdeasContext.Provider>
  )

  beforeEach(() => {
    ideas = getMockState().ideas
    user = getMockUserState()
    dispatch = jest.fn()
    idea = ideas[1]
  })

  it('should upvote idea', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    await act(async () => { userEvent.click(upvoteButton) })
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE })
    expect(addVote).toHaveBeenCalledWith("1", 'USER_ID', 1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_SUCCESS })
  })

  it('should downvote idea', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )

    await act(async () => userEvent.click(getByLabelText(/downvote/i)))

    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE })
    expect(addVote).toHaveBeenCalledWith("1", 'USER_ID', -1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_SUCCESS })
  })

  it('should catch error', async () => {
    const { getByLabelText, getByText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )

    const error = 'some error';
    (addVote as jest.Mock).mockImplementation(() => { throw new Error(error) })

    await act(async () => userEvent.click(getByLabelText(/downvote/i)))

    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE })
    expect(addVote).toHaveBeenCalledWith("1", 'USER_ID', -1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_ERROR, payload: error })
    expect(getByText(error)).toBeInTheDocument()
  })

  it('should disable voting on ideas user already voted for', async () => {
    // Increase number of votes in order to enable downvote button
    user.votes = [
      idea.id
    ]

    const { getByLabelText } = render(
      <UserContext.Provider value={{ user }}>
        <IdeaListItem idea={idea}/>
      </UserContext.Provider>
    )

    const downvoteButton = getByLabelText(/downvote/i)
    const upvoteButton = getByLabelText(/upvote/i)
    expect(downvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
  })

  it('should disable voting if idea belongs to user', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={ideas[0]}/>
        </UserContext.Provider>
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
    const button = getByLabelText(/downvote/i)
    expect(button.attributes.getNamedItem('disabled')).toBeTruthy()
  })
})
