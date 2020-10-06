/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateIdea = /* GraphQL */ `
  subscription OnCreateIdea($owner: String!) {
    onCreateIdea(owner: $owner) {
      id
      title
      description
      status
      upvotes
      downvotes
      userID
      user {
        id
        email
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateIdea = /* GraphQL */ `
  subscription OnUpdateIdea($owner: String!) {
    onUpdateIdea(owner: $owner) {
      id
      title
      description
      status
      upvotes
      downvotes
      userID
      user {
        id
        email
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteIdea = /* GraphQL */ `
  subscription OnDeleteIdea($owner: String!) {
    onDeleteIdea(owner: $owner) {
      id
      title
      description
      status
      upvotes
      downvotes
      userID
      user {
        id
        email
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String!) {
    onCreateUser(owner: $owner) {
      id
      email
      ideas {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String!) {
    onUpdateUser(owner: $owner) {
      id
      email
      ideas {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String!) {
    onDeleteUser(owner: $owner) {
      id
      email
      ideas {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateIdeaVote = /* GraphQL */ `
  subscription OnCreateIdeaVote($owner: String!) {
    onCreateIdeaVote(owner: $owner) {
      id
      ideaID
      userID
      vote
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateIdeaVote = /* GraphQL */ `
  subscription OnUpdateIdeaVote($owner: String!) {
    onUpdateIdeaVote(owner: $owner) {
      id
      ideaID
      userID
      vote
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteIdeaVote = /* GraphQL */ `
  subscription OnDeleteIdeaVote($owner: String!) {
    onDeleteIdeaVote(owner: $owner) {
      id
      ideaID
      userID
      vote
      createdAt
      updatedAt
      owner
    }
  }
`;
