import { render } from '@testing-library/react'
import React from 'react'
import Application from '.'

const { useAuth0 } = require('@auth0/auth0-react')

describe('', () => {
  it('should render loading if authenticated is false', () => {
    useAuth0.mockReturnValue({ isLoading: true })
    const { getByText } = render(<Application />)
    expect(getByText(/loading/i)).toBeInTheDocument()
  })

  it('should render error', () => {
    useAuth0.mockReturnValue({ error: { message: 'error' } })
    const { getByText } = render(<Application />)
    expect(getByText(/error/)).toMatchSnapshot()
  })
})
