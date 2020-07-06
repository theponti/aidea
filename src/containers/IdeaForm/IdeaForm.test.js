import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import IdeaForm from '.'
import { GlobalContext } from 'src/context/GlobalState'

describe('<IdeaForm/>', () => {
  it('should call addIdea with record', async () => {
    const addIdea = jest.fn()

    const { container, getByText } = render(
      <GlobalContext.Provider value={{ addIdea }}>
        <IdeaForm/>
      </GlobalContext.Provider>
    )

    const title = container.querySelector('input')
    const description = container.querySelector('textarea')
    const button = getByText(/submit/ig)

    await act(async () => {
      fireEvent.input(title, { target: { value: 'Rocketship for Cats' } })
      fireEvent.input(description, { target: { value: 'Backpack for cats that takes them to space' } })
      fireEvent.click(button)
    })

    expect(addIdea).toHaveBeenCalledWith({
      title: 'Rocketship for Cats',
      description: 'Backpack for cats that takes them to space'
    })

    expect(title.value).toEqual('')
    expect(description.value).toEqual('')
  })
})
