import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

jest.mock('./context/Firebase', () => ({
  auth: {
    onAuthStateChanged: async () => ({})
  },
  signOut: jest.fn(),
  generateUserDocument: jest.fn()
}))

test('renders idearz header', () => {
  const { container } = render(<App />)
  const linkElement = container.querySelector('header')
  expect(linkElement).toBeInTheDocument()
})
