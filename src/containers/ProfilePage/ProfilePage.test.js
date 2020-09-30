import { render } from '@testing-library/react'
import React from 'react'
import ProfilePage from 'src/containers/ProfilePage'
import { getMockUserState } from 'src/mocks'

describe('<ProfilePage/>', () => {
  let user

  beforeEach(() => {
    user = getMockUserState()
  })

  test('should display username', () => {
    const { queryByText } = render(<ProfilePage user={user}/>)
    expect(queryByText('foo')).toBeInTheDocument()
  })
})
