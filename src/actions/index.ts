export const auth = () => {

}

auth.sendPasswordResetEmail = (email: String) => {

}

auth.signInWithEmailAndPassword = (email: String, password: String) => {

}

auth.createUserWithEmailAndPassword = (email: String, password: String) => {
  return { user: { } }
}

auth.onAuthStateChanged = (fn: Function) => {
  fn()
}

export const getUser = () => {

}

export async function addIdeaToUser (id: string) {

}

export const addVoteToUser = async (ideaUID: string) => {

}

export async function addVoteToIdea (id: String, amount: Number) {

}

export async function saveIdea (idea: { title: String, description: String }) {

}

export const signInWithGoogle = () => {

}

export const signOut = () => {

}

export const getIdeas = async () => {

}

export const generateUserDocument = async (user: { }, additionalData?: any) => {

}
