import { createContext, useReducer, useState } from "react";
import AllSectionReducer from "./AllSectionReducer";

const AllSectionContext = createContext();

export const AllSectionContextProvider = ({ children }) => {
  const initialValues = {
    sections: [],
    loading: true,
  };

  const [state, dispatch] = useReducer(AllSectionReducer, initialValues);

  return (
    <AllSectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AllSectionContext.Provider>
  );
};

export default AllSectionContext;
