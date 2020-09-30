import { IdeasState } from 'src/interfaces/Idea'
import { User } from './interfaces/User'
import { appStates } from './reducers/action-types'

export interface MockUserState {
  uid: string,
  ideas: string[],
  votes: string[]
}

export function getMockUserState (): User {
  return {
    id: 'USER_ID',
    username: 'foo',
    email: 'foo@bar.com',
    ideas: [],
    votes: []
  }
}

export function getMockState (): IdeasState {
  return {
    status: appStates.LOADED,
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
