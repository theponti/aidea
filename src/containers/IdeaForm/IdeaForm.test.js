import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'

import IdeaForm from 'src/containers/IdeaForm'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { actionTypes } from 'src/reducers/action-types'
import { saveIdea, auth } from 'src/context/Firebase'

describe('<IdeaForm/>', () => {
  it('should call addIdea with record', async () => {
    const dispatch = jest.fn()
    auth.currentUser = { uid: 'SOME_ID' }

    const { container, getByText } = render(
      <IdeasContext.Provider value={{ dispatch }}>
        <IdeaForm/>
      </IdeasContext.Provider>
    )

    const idea = {
      title: 'Rocketship for Cats',
      description: 'Backpack for cats that takes them to space'
    }

    const titleInput = container.querySelector('input')
    const descriptionInput = container.querySelector('textarea')
    const button = getByText(/submit/ig)

    await act(async () => {
      fireEvent.input(titleInput, { target: { value: idea.title } })
      fireEvent.input(descriptionInput, { target: { value: idea.description } })
      fireEvent.click(button)
    })

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.ADD_IDEA
    })

    expect(saveIdea).toHaveBeenCalledWith(idea) // Should save idea to Firebase

    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.LOADED
    })

    expect(titleInput.value).toEqual('')
    expect(descriptionInput.value).toEqual('')
  })
})
