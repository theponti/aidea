import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { auth } from 'src/context/Firebase'
import { getMockState, getMockUserState } from 'src/mocks'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes } from 'src/reducers/action-types'
import IdeaListItem from '.'

describe('<IdeaListItem/>', () => {
  let idea
  let user
  let dispatch
  let ideas

  const IdeasProvider = ({ children }) => (
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

  afterEach(() => {
    ideas = null
    user = null
    idea = null
    dispatch = null
  })

  it('should upvote idea', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={ideas[1]}/>
        </UserContext.Provider>
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    await act(async () => fireEvent.click(upvoteButton))
    expect(dispatch).toBeCalledWith({ type: actionTypes.UPVOTE_IDEA, payload: '1' })
  })

  it('should not downvote idea if idea has 0 votes', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )

    await act(async () => fireEvent.click(getByLabelText(/downvote/i)))
    expect(dispatch).not.toBeCalledWith()
  })

  it('should downvote idea if idea > 0 votes', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 5

    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )

    await act(async () => fireEvent.click(getByLabelText(/downvote/i)))
    expect(dispatch).toBeCalledWith({ payload: '1', type: actionTypes.DOWNVOTE_IDEA })
  })

  it('should disable voting on ideas user already voted for', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 5
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

  it('should enable upvote button', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 0

    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeFalsy()
  })

  it('should disable upvote button if idea belongs to user', async () => {
    // Increase number of votes in order to enable downvote button
    idea.user = 'USER_ID'

    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
  })

  it('should disable downvote button if idea belongs to user', async () => {
    // Increase number of votes in order to enable downvote button
    idea.votes = 5
    idea.user = 'USER_ID'

    const { getByLabelText } = render(
      <IdeasProvider>
        <UserContext.Provider value={{ user }}>
          <IdeaListItem idea={idea}/>
        </UserContext.Provider>
      </IdeasProvider>
    )
    const button = getByLabelText(/downvote/i)
    expect(button.attributes.getNamedItem('disabled')).toBeTruthy()
  })
})
