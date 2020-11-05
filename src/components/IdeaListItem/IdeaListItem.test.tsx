import { useAuth0 } from '@auth0/auth0-react'
import { act, fireEvent, render } from '@testing-library/react'
import React, { Dispatch } from 'react'
import { actionTypes, addVoteToIdea } from 'src/actions'
import { Idea } from 'src/interfaces/Idea'
import { getMockState, getMockUserState } from 'src/mocks'
import { IdeasContext } from 'src/providers/IdeasProvider'
import IdeaListItem from '.'

jest.mock('src/actions', () => ({
  addVoteToIdea: jest.fn(),
  appStates: {
    LOADING: 'LOADING'
  },
  actionTypes: {
    IDEA_UPDATE: 'IDEA_UPDATE'
  }
}))

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
    user = getMockUserState().user;
    (useAuth0 as jest.Mock).mockReturnValue({ user: { votes: [] } })
    dispatch = jest.fn()
    idea = ideas[1]
  })

  it('should upvote idea', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    await act(async () => {
      fireEvent.click(upvoteButton)
    })
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE })
    expect(addVoteToIdea).toHaveBeenCalledWith('1', 1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_SUCCESS })
  })

  it('should downvote idea', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    )

    await act(async () => {
      fireEvent.click(getByLabelText(/downvote/i))
    })

    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE })
    expect(addVoteToIdea).toHaveBeenCalledWith('1', -1)
    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE_SUCCESS })
  })

  it('should catch error', async () => {
    const { getByLabelText, getByText } = render(
      <IdeasProvider>
        <IdeaListItem idea={idea} />
      </IdeasProvider>
    )

    const error = 'some error';
    (addVoteToIdea as jest.Mock).mockImplementation(() => {
      throw new Error(error)
    })

    await act(async () => {
      fireEvent.click(getByLabelText(/downvote/i))
    })

    expect(dispatch).toBeCalledWith({ type: actionTypes.IDEA_UPDATE })
    expect(addVoteToIdea).toHaveBeenCalledWith('1', -1)
    expect(dispatch).toBeCalledWith({
      type: actionTypes.IDEA_UPDATE_ERROR,
      payload: error
    })
    expect(getByText(error)).toBeInTheDocument()
  })

  xit('should disable voting on ideas user already voted for', async () => {
    // Increase number of votes in order to enable downvote button
    user.votes = [idea.id]

    const { getByLabelText } = render(<IdeaListItem idea={idea} />)

    const downvoteButton = getByLabelText(/downvote/i)
    const upvoteButton = getByLabelText(/upvote/i)
    expect(downvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
  })

  xit('should disable voting if idea belongs to user', async () => {
    const { getByLabelText } = render(
      <IdeasProvider>
        <IdeaListItem idea={ideas[0]} />
      </IdeasProvider>
    )
    const upvoteButton = getByLabelText(/upvote/i)
    expect(upvoteButton.attributes.getNamedItem('disabled')).toBeTruthy()
    const button = getByLabelText(/downvote/i)
    expect(button.attributes.getNamedItem('disabled')).toBeTruthy()
  })
})
