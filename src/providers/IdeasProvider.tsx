import t from 'prop-types'
import React, { createContext, useReducer } from 'react'
import { IdeasState } from 'src/interfaces/Idea'
import AppReducer from '../reducers/AppReducer'

// Initial State
const initialState: IdeasState = {
  ideas: [],
  isLoading: true,
  error: null
}

// Context
export const IdeasContext = createContext<{
  state: IdeasState;
  dispatch: React.Dispatch<any>;
}>({
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
