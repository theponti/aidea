import { IdeasState } from 'src/interfaces/Idea'
import { appStates } from './reducers/action-types'

export interface MockUserState {
  uid: string,
  ideas: string[],
  votes: string[]
}

export function getMockUserState (): { authorized: boolean, user: MockUserState } {
  return {
    authorized: true,
    user: {
      uid: 'USER_ID',
      ideas: [],
      votes: []
    }
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
