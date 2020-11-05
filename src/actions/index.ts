export const appStates = {
  LOADING: 'LOADING',
  LOADED: 'LOADED',
  ERROR: 'ERROR',
};

export const actionTypes = {
  FETCH_IDEAS: 'FETCH_IDEAS',
  FETCH_IDEAS_SUCCESS: 'FETCH_IDEAS_SUCCESS',
  FETCH_IDEAS_ERROR: 'FETCH_IDEAS_ERROR',

  IDEA_UPDATE: 'IDEA_UPDATE',
  IDEA_UPDATE_SUCCESS: 'IDEA_UPDATE_SUCCESS',
  IDEA_UPDATE_ERROR: 'IDEA_UPDATE_ERROR',
};

export function addVoteToIdea(id: string, score: number) {}

export const auth = {
  sendPasswordResetEmail(email: string) {},
  signInWithEmailAndPassword(email: string, password: string) {},
};

export function generateUserDocument() {}

export async function getIdeas() {
  return [];
}

export function saveIdea() {}
