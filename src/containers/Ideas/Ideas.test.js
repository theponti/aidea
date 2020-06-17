import React from 'react'
import { render } from '@testing-library/react'
import Ideas from '.'
import { GlobalContext } from 'src/context/GlobalState'
import { getMockState } from 'src/mocks'

describe('<Ideas/>', () => {
  it('should render ideas', () => {
    const state = getMockState()
    const { container } = render(
      <GlobalContext.Provider value={state}>
        <Ideas/>
      </GlobalContext.Provider>
    )
    expect(container).toHaveTextContent('Votes: 0')
    expect(container).toHaveTextContent('Votes: 5')
  })
})