import { Idea } from 'src/interfaces/Idea'

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

export function getMockState (): { ideas: Idea[] } {
  return {
    ideas: [
      {
        _id: '0',
        title: 'Some idea',
        description: 'Some description',
        upvotes: 0,
        downvotes: 5,
        user: 'USER_ID'
      },
      {
        _id: '1',
        title: 'Some another idea',
        description: 'Some another description',
        upvotes: 5,
        downvotes: 7,
        user: 'OTHER_USER_ID'
      }
    ]
  }
}
