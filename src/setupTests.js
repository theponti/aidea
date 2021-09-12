// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { withAuthenticationRequired } from '@auth0/auth0-react'
import '@testing-library/jest-dom/extend-expect'
import 'mutationobserver-shim'
import React from 'react'

jest.mock('@auth0/auth0-react')
withAuthenticationRequired.mockReturnValue(React.createElement('div'))
