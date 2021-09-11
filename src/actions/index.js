export const appStates = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR'
}

export const actionTypes = {
  ADD_IDEAS: 'ideas/add',
  FETCH_IDEAS: 'FETCH_IDEAS',
  FETCH_IDEAS_SUCCESS: 'FETCH_IDEAS_SUCCESS',
  FETCH_IDEAS_ERROR: 'FETCH_IDEAS_ERROR',
  LOADED: 'ideas/loaded',
  IDEA_UPDATE: 'IDEA_UPDATE',
  IDEA_UPDATE_SUCCESS: 'IDEA_UPDATE_SUCCESS',
  IDEA_UPDATE_ERROR: 'IDEA_UPDATE_ERROR'
}

export function addVoteToIdea (id, score) {}

export const auth = {
  sendPasswordResetEmail (email) {},
  signInWithEmailAndPassword (email, password) {}
}

export function generateUserDocument () {}

export async function getIdeas () {
  return []
}

export function saveIdea () {}
