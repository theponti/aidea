import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { act } from 'react-dom/test-utils'
import IdeaForm from 'src/containers/IdeaForm'
import { getMockUserState } from 'src/mocks'
import { saveIdea } from 'src/providers/Amplify'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { UserContext } from 'src/providers/UserProvider'
import { actionTypes } from 'src/reducers/action-types'

describe('<IdeaForm/>', () => {
  it('should call addIdea with record', async () => {
    const dispatch = jest.fn()

    const { container, getByRole } = render(
      <UserContext.Provider value={{ user: getMockUserState() }}>
        <IdeasContext.Provider value={{ state: { ideas: [] }, dispatch }}>
          <IdeaForm/>
        </IdeasContext.Provider>
      </UserContext.Provider>
    )

    const idea = {
      title: 'Rocketship for Cats',
      description: 'Backpack for cats that takes them to space'
    }

    const titleInput = container.querySelector('input')
    const descriptionInput = container.querySelector('textarea')
    const button = getByRole("button")
    
    await act(async () => {
      fireEvent.input(titleInput as Element, idea.title)
      fireEvent.input(descriptionInput as Element, idea.description)
      fireEvent.click(button)
    })

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.IDEA_UPDATE
    })

    expect(saveIdea).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.IDEA_UPDATE_SUCCESS
    })
  })
})
