import { createContext, useEffect, useReducer } from "react";
import SpecificSectionReducer from "./SpecificSectionReducer";

import axios from "axios";

const SpecificSectionContext = createContext();

export const SpecificSectionContextProvider = ({ children }) => {
  const initialValues = {
    sectionName: "",
    section: {},
    subjectName: "",
    subject: {},
    isAdviser: false,
    loading: false,
  };

  const [state, dispatch] = useReducer(SpecificSectionReducer, initialValues);

  // Fetch section details
  useEffect(() => {
    if (state.sectionName !== "") {
      const fetchSectionData = async () => {
        try {
          dispatch({ type: "SET_LOADING" });
          const fetchSection = await axios.get(`/api/v1/sections/${state.sectionName}`);
          const fetchAdviser = await axios.get(`/api/v1/sections/${state.sectionName}/adviser`);
          const [section, adviser] = await Promise.all([fetchSection, fetchAdviser]);
          dispatch({ type: "SET_SECTION", payload: section.data.section });
          dispatch({ type: "IS_ADVISER", payload: adviser.data });
        } catch (e) {
          console.log(e);
        }
      };
      fetchSectionData();
    }
  }, [state.sectionName]);

  return (
    <SpecificSectionContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SpecificSectionContext.Provider>
  );
};

export default SpecificSectionContext;
