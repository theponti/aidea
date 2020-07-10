import React from 'react'
import { render } from '@testing-library/react'
import Ideas from '.'
import { IdeasContext } from 'src/providers/IdeasProvider'
import { getMockState, getMockUserState } from 'src/mocks'
import { UserContext } from 'src/providers/UserProvider'

describe('<Ideas/>', () => {
  it('should render ideas', () => {
    const state = getMockState()
    const { user } = getMockUserState()
    const { container } = render(
      <IdeasContext.Provider value={{ state }}>
        <UserContext.Provider value={{ user }}>
          <Ideas/>
        </UserContext.Provider>
      </IdeasContext.Provider>
    )
    expect(container).toHaveTextContent('upvotes: 0')
    expect(container).toHaveTextContent('upvotes: 5')
  })
})
