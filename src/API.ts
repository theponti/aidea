/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateIdeaInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  status?: string | null,
  userID: string,
};

export type ModelIdeaConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
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

export type CreatePrivateNoteInput = {
  id?: string | null,
  content: string,
};

export type ModelPrivateNoteConditionInput = {
  content?: ModelStringInput | null,
  and?: Array< ModelPrivateNoteConditionInput | null > | null,
  or?: Array< ModelPrivateNoteConditionInput | null > | null,
  not?: ModelPrivateNoteConditionInput | null,
};

export type UpdatePrivateNoteInput = {
  id: string,
  content?: string | null,
};

export type DeletePrivateNoteInput = {
  id?: string | null,
};

export type ModelIdeaFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  status?: ModelStringInput | null,
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

export type ModelPrivateNoteFilterInput = {
  id?: ModelIDInput | null,
  content?: ModelStringInput | null,
  and?: Array< ModelPrivateNoteFilterInput | null > | null,
  or?: Array< ModelPrivateNoteFilterInput | null > | null,
  not?: ModelPrivateNoteFilterInput | null,
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

export type CreatePrivateNoteMutationVariables = {
  input: CreatePrivateNoteInput,
  condition?: ModelPrivateNoteConditionInput | null,
};

export type CreatePrivateNoteMutation = {
  createPrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdatePrivateNoteMutationVariables = {
  input: UpdatePrivateNoteInput,
  condition?: ModelPrivateNoteConditionInput | null,
};

export type UpdatePrivateNoteMutation = {
  updatePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeletePrivateNoteMutationVariables = {
  input: DeletePrivateNoteInput,
  condition?: ModelPrivateNoteConditionInput | null,
};

export type DeletePrivateNoteMutation = {
  deletePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
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

export type GetPrivateNoteQueryVariables = {
  id: string,
};

export type GetPrivateNoteQuery = {
  getPrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListPrivateNotesQueryVariables = {
  filter?: ModelPrivateNoteFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPrivateNotesQuery = {
  listPrivateNotes:  {
    __typename: "ModelPrivateNoteConnection",
    items:  Array< {
      __typename: "PrivateNote",
      id: string,
      content: string,
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

export type OnCreatePrivateNoteSubscriptionVariables = {
  owner: string,
};

export type OnCreatePrivateNoteSubscription = {
  onCreatePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdatePrivateNoteSubscriptionVariables = {
  owner: string,
};

export type OnUpdatePrivateNoteSubscription = {
  onUpdatePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeletePrivateNoteSubscriptionVariables = {
  owner: string,
};

export type OnDeletePrivateNoteSubscription = {
  onDeletePrivateNote:  {
    __typename: "PrivateNote",
    id: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
