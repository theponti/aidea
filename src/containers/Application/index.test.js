import React from 'react'
import { render } from '@testing-library/react'
import { UserContext } from 'src/providers/UserProvider'
import Application from '.'

jest.mock('src/context/Firebase', () => ({
  auth: {
    onAuthStateChanged: async () => ({})
  },
  signOut: jest.fn(),
  generateUserDocument: jest.fn()
}))

describe('', () => {
  beforeEach(() => {})
  afterEach(() => {})

  it('should render loading if authenticated is false', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ authenticated: false }}>
        <Application/>
      </UserContext.Provider>
    )
    expect(getByText(/loading/i)).toBeInTheDocument()
  })

  it('should render Sign In if authenticated is true and user is null', () => {
    const { queryAllByText } = render(
      <UserContext.Provider value={{ authenticated: true, user: null }}>
        <Application/>
      </UserContext.Provider>
    )
    expect(queryAllByText(/sign in/i)).toHaveLength(2)
  })

  it('should render Ideas if authenticated is true and user is truthy', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ authenticated: true, user: { email: 'cats@dogs.com' } }}>
        <Application/>
      </UserContext.Provider>
    )
    expect(getByText(/submit for inspection/i)).toBeInTheDocument()
  })
})
