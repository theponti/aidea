// Docs: https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions')
const admin = require('firebase-admin')

// Initialize application
admin.initializeApp()

/**
 * On create of user, retrieve
 */
exports.setOrganizationToUser = (
  functions
    .firestore
    .document('/users/{documentId}')
    .onCreate((snap, context) => {
      // Grab the current value of what was written to Cloud Firestore.
      const { email } = snap.data()

      // Access the parameter `{documentId}` with `context.params`
      functions.logger.log('Retrieving organization', context.params.documentId, email)

      const urlElements = email.split('.')
      const topLevelDomain = urlElements[urlElements.length - 1]
      const subDomains = (
        email.split('@')[1] // Get string after mailbox name
          .split(`.${topLevelDomain}`)[0] // seperate subdomains from top-level domain
          .split('.') // sepearte subdomains
      )
      const org = subDomains[subDomains.length - 1].toUpperCase()

      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to Cloud Firestore.
      // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
      return snap.ref.set({ org }, { merge: true })
    })
)
