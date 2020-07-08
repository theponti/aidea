import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

jest.mock('./context/Firebase', () => ({
  auth: {
    onAuthStateChanged: async () => ({})
  },
  signOut: jest.fn(),
  generateUserDocument: jest.fn()
}))

test('renders idearz header', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/idearz/i)
  expect(linkElement).toBeInTheDocument()
})
