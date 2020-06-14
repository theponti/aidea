import React, { createContext, useReducer } from 'react'
import AppReducer from '../reducers/AppReducer'

// Initial State
const initialState = {
  ideas: [
    { 
      _id: 0,
      title: 'Some Crazy Idea',
      description: 'An elaborate description of why this idea will change the world!',
      votes: 0
    }
  ]
}

// Context
export const GlobalContext = createContext(initialState)

// Provider
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  function addIdea(payload) {
    dispatch({ type: 'ADD_IDEA', payload })
  }

  function downvoteIdea(payload) {
    dispatch({ type: 'DOWNVOTE_IDEA', payload })
  }
  
  function upvoteIdea(payload) {
    dispatch({ type: 'UPVOTE_IDEA', payload })
  }

  return (
    <GlobalContext.Provider value={{ ideas: state.ideas, addIdea, downvoteIdea, upvoteIdea }}>
      {children}
    </GlobalContext.Provider>
  );
}