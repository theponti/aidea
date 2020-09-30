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
export const onCreatePrivateNote = /* GraphQL */ `
  subscription OnCreatePrivateNote($owner: String!) {
    onCreatePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdatePrivateNote = /* GraphQL */ `
  subscription OnUpdatePrivateNote($owner: String!) {
    onUpdatePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeletePrivateNote = /* GraphQL */ `
  subscription OnDeletePrivateNote($owner: String!) {
    onDeletePrivateNote(owner: $owner) {
      id
      content
      createdAt
      updatedAt
      owner
    }
  }
`;
