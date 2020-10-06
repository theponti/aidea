/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getIdea = /* GraphQL */ `
  query GetIdea($id: ID!) {
    getIdea(id: $id) {
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
export const listIdeas = /* GraphQL */ `
  query ListIdeas(
    $filter: ModelIdeaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIdeas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        status
        upvotes
        downvotes
        userID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getIdeaVote = /* GraphQL */ `
  query GetIdeaVote($id: ID!) {
    getIdeaVote(id: $id) {
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
export const listIdeaVotes = /* GraphQL */ `
  query ListIdeaVotes(
    $filter: ModelIdeaVoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listIdeaVotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ideaID
        userID
        vote
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
