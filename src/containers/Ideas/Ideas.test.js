import React from 'react'
import { render } from '@testing-library/react'
import Ideas from '.'
import { GlobalContext } from 'src/context/GlobalState'

describe('<Ideas/>', () => {
  it('should render ideas', () => {
    const ideas = [
      { _id: 0, title: 'Some idea', description: 'Some description', votes: 0 },
      { _id: 1, title: 'Some another idea', description: 'Some another description', votes: 5 }
    ]
    const { container } = render(
      <GlobalContext.Provider value={{ ideas }}>
        <Ideas/>
      </GlobalContext.Provider>
    )
    expect(container).toHaveTextContent('Votes: 0')
    expect(container).toHaveTextContent('Votes: 5')
  })
})