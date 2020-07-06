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

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider)
}

export const signOut = () => {
  auth.signOut()
}

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return
  const userRef = firestore.doc(`users/${user.uid}`)
  const snapshot = await userRef.get()

  // If a document has not yet been created for user, creat one
  if (!snapshot.exists) {
    const { email, displayName, photoUrl } = user

    try {
      await userRef.set({ displayName, email, photoUrl, ...additionalData })
    } catch (error) {
      console.error('Error creating user document', error)
    }
  }
}
