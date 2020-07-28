# 🧠 Idears 🧠

An application to allow teammates to suggest and join forces on ideas for new projects within an organization.

## Stack
- **React**
- **Firebase**
  - **Firebase Auth** for authentication
  - **Firestore** for data storage
  - **Firebase Functions** for tasks, data validation, etc
  - **Firebase Hosting** for hosting web application
- **Jest** for testing
- **GitHub Actions** for CI and CD

## Features
As a user, I can:
- join an organization based on my corporate email address
- add ideas
- edit ideas
- upvote ideas
  - can only add one upvote per idea
  - cannot upvote my own ideas
- downvote ideas
  - can only add one downvote per idea
  - cannot downvote my own ideas
- "join" an idea to signify you'd like to work with that team