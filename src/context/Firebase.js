import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const getUser = () => {
  return auth.currentUser
}

export async function addIdeaToUser (id) {
  const user = auth.currentUser
  const userRef = firestore.doc(`users/${user.uid}`)

  try {
    const snapshot = await userRef.get()
    await userRef.update({ ideas: [...snapshot.get('ideas'), id] })
  } catch (err) {
    console.log(err)
  }
}

export const addVoteToUser = async (ideaUID) => {
  const user = auth.currentUser
  const userRef = firestore.doc(`users/${user.uid}`)

  try {
    const { data } = await userRef.get()
    await userRef.set({ votes: [...data.votes, ideaUID] })
  } catch (err) {
    console.log(err)
  }
}

export async function addVoteToIdea (id, amount) {
  const ideaRef = await firestore.doc(`ideas/${id}`)
  const snapshot = await ideaRef.get()

  if (amount > 0) {
    await ideaRef.set({ upvotes: snapshot.get('upvotes') + amount })
    return await ideaRef.get()
  } else if (amount < 0) {
    await ideaRef.set({ downvotes: snapshot.get('downvotes') + amount })
    return await ideaRef.get()
  }
}

export async function saveIdea (idea) {
  const user = auth.currentUser
  const ideaRef = await firestore.collection('ideas').add({
    upvotes: 0,
    downvotes: 0,
    user: user.uid,
    ...idea
  })
  await addIdeaToUser(ideaRef)
}

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider)
}

export const signOut = () => {
  auth.signOut()
}

export const getIdeas = async () => {
  const { docs } = await firestore.collection('ideas').get()
  return docs.map(t => ({ ...t.data(), id: t.id }))
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return

  const userRef = firestore.doc(`users/${user.uid}`)
  let snapshot

  try {
    snapshot = await userRef.get()
  } catch (err) {
    console.log(err)
    return
  }

  // If a document has not yet been created for user, creat one
  if (!snapshot.exists) {
    const {
      email,
      displayName,
      photoUrl = 'https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/robot-03-icon.png'
    } = user

    try {
      await userRef.set({
        displayName,
        email,
        photoUrl,
        votes: [], // Add empty votes for new user
        ideas: [] // Add empty ideas for new user
      })
      snapshot = await userRef.get()
    } catch (error) {
      console.error('Error creating user document', error)
      return
    }
  }

  return snapshot.data()
}
