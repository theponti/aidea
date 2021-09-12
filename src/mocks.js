export function getMockUserState () {
  return {
    uid: 'USER_ID',
    ideas: [],
    votes: []
  }
}

export function getMockState () {
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
