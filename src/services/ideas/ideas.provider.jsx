import t from "prop-types";
import React, { createContext, useReducer } from "react";
import { ideasReducer } from "./ideas.ducks";

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
  const [state, dispatch] = useReducer(ideasReducer, initialState);

  return (
    <IdeasContext.Provider value={{ state, dispatch }}>
      {children}
    </IdeasContext.Provider>
  );
};

IdeasProvider.propTypes = {
  children: t.node,
};
