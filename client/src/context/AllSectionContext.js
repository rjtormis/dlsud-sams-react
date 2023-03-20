import { createContext, useReducer, useEffect, useContext, useState } from "react";

// Reducer
import AllSectionReducer from "../reducers/AllSectionReducer";
// Hooks
import useFetch from "../hooks/useFetch";

const AllSectionContext = createContext();

export const AllSectionContextProvider = ({ children }) => {
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const initialValues = {
    sections: [],
  };

  const [state, dispatch] = useReducer(AllSectionReducer, initialValues);
  const { data } = useFetch("/api/v1/sections", "sections");

  useEffect(() => {
    setLoading(true);
    if (data !== null) {
      dispatch({ type: "GET_ALL_SECTIONS", payload: data });
      setLoading(false);
    }
  }, [data, setLoading]);

  return (
    <AllSectionContext.Provider
      value={{
        ...state,
        dispatch,
        section,
        setSection,
        loading,
        setLoading,
        notFound,
        setNotFound,
      }}
    >
      {children}
    </AllSectionContext.Provider>
  );
};

export function useAllSection() {
  return useContext(AllSectionContext);
}

export default AllSectionContext;
