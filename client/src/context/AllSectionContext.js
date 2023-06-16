import { createContext, useReducer, useEffect, useContext, useState } from "react";

// Reducer
import AllSectionReducer from "../reducers/AllSectionReducer";
// Hooks
import useFetch from "../hooks/useFetch";
import axios from "axios";
axios.defaults.baseURL = "https://dlsud-sams-react-production.up.railway.app";

const AllSectionContext = createContext();

export const AllSectionContextProvider = ({ children }) => {
  const [section, setSection] = useState({});
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get("/api/v1/sections");
        dispatch({ type: "GET_ALL_SECTIONS", payload: data.data.sections });
        setLoading(false);
        setReFetch(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
        setReFetch(false);
      }
    };

    if (reFetch === true) {
      fetchData();
    }
  }, [reFetch]);

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
        reFetch,
        setReFetch,
        isModalOpen,
        setIsModalOpen,
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
