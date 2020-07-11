// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import 'mutationobserver-shim'

jest.mock('src/context/Firebase', () => ({
  auth: {
    onAuthStateChanged: async () => ({})
  },
  signOut: jest.fn(),
  generateUserDocument: jest.fn(),
  saveIdea: jest.fn(),
  addVoteToIdea: jest.fn()
}))
