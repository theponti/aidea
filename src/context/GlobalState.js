import React, { createContext, useReducer } from 'react'
import t from 'prop-types'
import AppReducer from '../reducers/AppReducer'
import { getActions } from 'src/reducers/action-types'

// Initial State
const initialState = {
  user: {
    _id: 'SOME_ID',
    votes: [],
    ideas: []
  },
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

  return (
    <GlobalContext.Provider value={{ ...state, ...getActions(dispatch) }}>
      {children}
    </GlobalContext.Provider>
  )
}

GlobalProvider.propTypes = {
  children: t.node
}
