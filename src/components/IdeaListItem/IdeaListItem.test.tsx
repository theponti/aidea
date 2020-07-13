import { act, fireEvent, render } from '@testing-library/react'
import React, { Dispatch } from 'react'
import { addVoteToIdea, auth } from 'src/context/Firebase'
import { Idea } from 'src/interfaces/Idea'
import { getMockState, getMockUserState } from 'src/mocks'
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
    user = getMockUserState().user
    auth.currentUser = user
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
    await act(async () => { fireEvent.click(upvoteButton) })
    expect(dispatch).toBeCalledWith({ type: actionTypes.UPVOTE_IDEA })
    expect(addVoteToIdea).toHaveBeenCalledWith('1', 1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.LOADED })
  })

  it('should downvote idea', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )

    await act(async () => {
      fireEvent.click(getByLabelText(/downvote/i))
    })

    expect(dispatch).toBeCalledWith({ type: actionTypes.DOWNVOTE_IDEA })
    expect(addVoteToIdea).toHaveBeenCalledWith('1', -1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.LOADED })
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
