import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test('renders idearz header', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/idearz/i)
  expect(linkElement).toBeInTheDocument()
})
