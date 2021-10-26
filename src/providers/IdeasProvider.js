import t from "prop-types";
import React, { createContext, useReducer } from "react";
import AppReducer from "../reducers/AppReducer";

const initialState = {
  ideas: [],
  isLoading: true,
  error: null,
};

export const IdeasContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const IdeasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <IdeasContext.Provider value={{ state, dispatch }}>
      {children}
    </IdeasContext.Provider>
  );
};

IdeasProvider.propTypes = {
  children: t.node,
};
