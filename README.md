# 🧠 Aidea 🧠

An application to allow teammates to suggest and join forces on ideas for new projects within an organization.

## The Problem
There are many applications for listing to-dos or notes, but none specifically tuned to managing ideas.
Ideas are different from to-dos in that they are the rumblings of a project but is not fully formed. Ideas
can require investigation and consensus before action items can be created.

## This Solution
This solution acts like a Reddit board for a team. Here users can quality jot down their ideas and
have other users vote on

## Stack
- **React**
- `react-hook-form`
- ♺ `Material UI`
- 💅 `Styled Componets`
- 🐍 `SCSS`
- ⎏ `TypeScript`
- 👑 `Jest`
- 🚀 `AWS Amplify`
  - **Authenication**
  - **Storage** for attachments
  - **Functions** for tasks, data validation, etc
  - **Hosting** for hosting web application
- **GitHub Actions** for CI and CD

## User Stories
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