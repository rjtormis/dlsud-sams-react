import { createContext, useReducer, useEffect, useContext } from "react";

// Reducer
import AllSectionReducer from "../reducers/AllSectionReducer";
// Hooks
import useFetch from "../hooks/useFetch";

const AllSectionContext = createContext();

export const AllSectionContextProvider = ({ children }) => {
  const initialValues = {
    sections: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(AllSectionReducer, initialValues);
  const { data } = useFetch("/api/v1/sections", "sections");

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    if (data !== null) {
      dispatch({ type: "GET_ALL_SECTIONS", payload: data });
    }
  }, [data, dispatch]);

  return (
    <AllSectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AllSectionContext.Provider>
  );
};

export function useAllSection() {
  return useContext(AllSectionContext);
}

export default AllSectionContext;
