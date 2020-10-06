/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIdeaInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  status?: string | null,
  upvotes?: number | null,
  downvotes?: number | null,
  userID: string,
};

export type ModelIdeaConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
  upvotes?: ModelIntInput | null,
  downvotes?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelIdeaConditionInput | null > | null,
  or?: Array< ModelIdeaConditionInput | null > | null,
  not?: ModelIdeaConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateIdeaInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  status?: string | null,
  upvotes?: number | null,
  downvotes?: number | null,
  userID?: string | null,
};

export type DeleteIdeaInput = {
  id?: string | null,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateIdeaVoteInput = {
  id?: string | null,
  ideaID: string,
  userID: string,
  vote?: number | null,
};

export type ModelIdeaVoteConditionInput = {
  ideaID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  vote?: ModelIntInput | null,
  and?: Array< ModelIdeaVoteConditionInput | null > | null,
  or?: Array< ModelIdeaVoteConditionInput | null > | null,
  not?: ModelIdeaVoteConditionInput | null,
};

export type UpdateIdeaVoteInput = {
  id: string,
  ideaID?: string | null,
  userID?: string | null,
  vote?: number | null,
};

export type DeleteIdeaVoteInput = {
  id?: string | null,
};

export type ModelIdeaFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
  upvotes?: ModelIntInput | null,
  downvotes?: ModelIntInput | null,
  userID?: ModelIDInput | null,
  and?: Array< ModelIdeaFilterInput | null > | null,
  or?: Array< ModelIdeaFilterInput | null > | null,
  not?: ModelIdeaFilterInput | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIdeaVoteFilterInput = {
  id?: ModelIDInput | null,
  ideaID?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  vote?: ModelIntInput | null,
  and?: Array< ModelIdeaVoteFilterInput | null > | null,
  or?: Array< ModelIdeaVoteFilterInput | null > | null,
  not?: ModelIdeaVoteFilterInput | null,
};

export type CreateIdeaMutationVariables = {
  input: CreateIdeaInput,
  condition?: ModelIdeaConditionInput | null,
};

export type CreateIdeaMutation = {
  createIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateIdeaMutationVariables = {
  input: UpdateIdeaInput,
  condition?: ModelIdeaConditionInput | null,
};

export type UpdateIdeaMutation = {
  updateIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteIdeaMutationVariables = {
  input: DeleteIdeaInput,
  condition?: ModelIdeaConditionInput | null,
};

export type DeleteIdeaMutation = {
  deleteIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type CreateIdeaVoteMutationVariables = {
  input: CreateIdeaVoteInput,
  condition?: ModelIdeaVoteConditionInput | null,
};

export type CreateIdeaVoteMutation = {
  createIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateIdeaVoteMutationVariables = {
  input: UpdateIdeaVoteInput,
  condition?: ModelIdeaVoteConditionInput | null,
};

export type UpdateIdeaVoteMutation = {
  updateIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteIdeaVoteMutationVariables = {
  input: DeleteIdeaVoteInput,
  condition?: ModelIdeaVoteConditionInput | null,
};

export type DeleteIdeaVoteMutation = {
  deleteIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetIdeaQueryVariables = {
  id: string,
};

export type GetIdeaQuery = {
  getIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListIdeasQueryVariables = {
  filter?: ModelIdeaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIdeasQuery = {
  listIdeas:  {
    __typename: "ModelIdeaConnection",
    items:  Array< {
      __typename: "Idea",
      id: string,
      title: string,
      description: string | null,
      status: string | null,
      upvotes: number | null,
      downvotes: number | null,
      userID: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetIdeaVoteQueryVariables = {
  id: string,
};

export type GetIdeaVoteQuery = {
  getIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListIdeaVotesQueryVariables = {
  filter?: ModelIdeaVoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListIdeaVotesQuery = {
  listIdeaVotes:  {
    __typename: "ModelIdeaVoteConnection",
    items:  Array< {
      __typename: "IdeaVote",
      id: string,
      ideaID: string,
      userID: string,
      vote: number | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateIdeaSubscriptionVariables = {
  owner: string,
};

export type OnCreateIdeaSubscription = {
  onCreateIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateIdeaSubscriptionVariables = {
  owner: string,
};

export type OnUpdateIdeaSubscription = {
  onUpdateIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteIdeaSubscriptionVariables = {
  owner: string,
};

export type OnDeleteIdeaSubscription = {
  onDeleteIdea:  {
    __typename: "Idea",
    id: string,
    title: string,
    description: string | null,
    status: string | null,
    upvotes: number | null,
    downvotes: number | null,
    userID: string,
    user:  {
      __typename: "User",
      id: string,
      email: string,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner: string,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner: string,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    email: string,
    ideas:  {
      __typename: "ModelIdeaConnection",
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateIdeaVoteSubscriptionVariables = {
  owner: string,
};

export type OnCreateIdeaVoteSubscription = {
  onCreateIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateIdeaVoteSubscriptionVariables = {
  owner: string,
};

export type OnUpdateIdeaVoteSubscription = {
  onUpdateIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteIdeaVoteSubscriptionVariables = {
  owner: string,
};

export type OnDeleteIdeaVoteSubscription = {
  onDeleteIdeaVote:  {
    __typename: "IdeaVote",
    id: string,
    ideaID: string,
    userID: string,
    vote: number | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
