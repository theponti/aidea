/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createIdea = /* GraphQL */ `
  mutation CreateIdea(
    $input: CreateIdeaInput!
    $condition: ModelIdeaConditionInput
  ) {
    createIdea(input: $input, condition: $condition) {
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
export const updateIdea = /* GraphQL */ `
  mutation UpdateIdea(
    $input: UpdateIdeaInput!
    $condition: ModelIdeaConditionInput
  ) {
    updateIdea(input: $input, condition: $condition) {
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
export const deleteIdea = /* GraphQL */ `
  mutation DeleteIdea(
    $input: DeleteIdeaInput!
    $condition: ModelIdeaConditionInput
  ) {
    deleteIdea(input: $input, condition: $condition) {
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createIdeaVote = /* GraphQL */ `
  mutation CreateIdeaVote(
    $input: CreateIdeaVoteInput!
    $condition: ModelIdeaVoteConditionInput
  ) {
    createIdeaVote(input: $input, condition: $condition) {
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
export const updateIdeaVote = /* GraphQL */ `
  mutation UpdateIdeaVote(
    $input: UpdateIdeaVoteInput!
    $condition: ModelIdeaVoteConditionInput
  ) {
    updateIdeaVote(input: $input, condition: $condition) {
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
export const deleteIdeaVote = /* GraphQL */ `
  mutation DeleteIdeaVote(
    $input: DeleteIdeaVoteInput!
    $condition: ModelIdeaVoteConditionInput
  ) {
    deleteIdeaVote(input: $input, condition: $condition) {
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
