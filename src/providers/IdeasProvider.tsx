import React, { createContext, useReducer } from 'react'
import t from 'prop-types'
import AppReducer from '../reducers/AppReducer'
import { IdeasState } from 'src/interfaces/Idea'

// Initial State
const initialState: IdeasState = {
  ideas: [
    {
      _id: '0',
      title: 'Some Crazy Idea',
      description: 'An elaborate description of why this idea will change the world!',
      upvotes: 0,
      downvotes: 0,
      user: 'SOME_USER'
    }
  ]
}

// Context
export const IdeasContext = createContext<{ state: IdeasState; dispatch: React.Dispatch<any>}>({
  state: initialState,
  dispatch: () => null
})

// Provider
export const IdeasProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

  return (
    <IdeasContext.Provider value={{ state, dispatch }}>
      {children}
    </IdeasContext.Provider>
  )
}

IdeasProvider.propTypes = {
  children: t.node
}
