export function getMockState() {
  return {
    user: {
      _id: 'USER_ID'
    },
    ideas: [
      { 
        _id: 0, 
        title: 'Some idea', 
        description: 'Some description', 
        votes: 0 
      },
      { 
        _id: 1, 
        title: 'Some another idea', 
        description: 'Some another description', 
        votes: 5 
      }
    ]
  }
}