import { render } from '@testing-library/react'
import React from 'react'
import App from './App'

test('renders idearz header', () => {
  const { container } = render(<App />)
  const linkElement = container.querySelector('header')
  expect(linkElement).toBeInTheDocument()
})
