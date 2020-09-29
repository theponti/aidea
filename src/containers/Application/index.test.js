import { AuthState } from '@aws-amplify/ui-components'
import { render } from '@testing-library/react'
import React from 'react'
import { getMockUserState } from 'src/mocks'
import { UserContext } from 'src/providers/UserProvider'
import Application from '.'

describe('', () => {
  beforeEach(() => {})
  afterEach(() => {})

  it('should render loading if authenticated is false', () => {
    const { container } = render(
      <UserContext.Provider value={{ authState: undefined }}>
        <Application/>
      </UserContext.Provider>
    )
    expect(container.querySelector('amplify-authenticator')).toBeInTheDocument()
  })

  xit('should render Ideas if authenticated is true and user is truthy', () => {
    const { getByText } = render(
      <UserContext.Provider value={{ authState: AuthState.SignedIn, user: getMockUserState() }}>
        <Application/>
      </UserContext.Provider>
    )
    expect(getByText(/submit for inspection/i)).toBeInTheDocument()
  })
})
