import { IdeasState } from 'src/interfaces/Idea'

export interface MockUserState {
  uid: string;
  ideas: string[];
  votes: string[];
}

export function getMockUserState (): MockUserState {
  return {
    uid: 'USER_ID',
    ideas: [],
    votes: []
  }
}

export function getMockState (): IdeasState {
  return {
    isLoading: true,
    ideas: [
      {
        id: '0',
        title: 'Some idea',
        description: 'Some description',
        upvotes: 0,
        downvotes: 5,
        user: 'USER_ID'
      },
      {
        id: '1',
        title: 'Some another idea',
        description: 'Some another description',
        upvotes: 5,
        downvotes: 7,
        user: 'OTHER_USER_ID'
      }
    ]
  }
}
