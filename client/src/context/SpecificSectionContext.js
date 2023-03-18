import { createContext, useEffect, useReducer, useContext, useState } from "react";
import SpecificSectionReducer from "../reducers/SpecificSectionReducer";

// Actions
import { fetchSpecificSectionDetails } from "../actions/SpecificSection";

const SpecificSectionContext = createContext();

export const SpecificSectionContextProvider = ({ children }) => {
  const [sectionName, setSectionName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [isAdviser, setIsAdviser] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    section: {},
    subject: {},
    editSubject: {},
    enrolled: [],
  };

  const [state, dispatch] = useReducer(SpecificSectionReducer, initialValues);

  // Fetch section details
  useEffect(() => {
    if (sectionName !== "") {
      const fetchSectionData = async () => {
        try {
          setLoading(true);
          const [section, adviser] = await fetchSpecificSectionDetails(sectionName);
          dispatch({ type: "SET_SECTION", payload: section.data.section });
          setIsAdviser(adviser.data.isAdviser);
        } catch (e) {
          console.log(e);
        }
      };
      fetchSectionData();
    }
  }, [sectionName]);

  return (
    <SpecificSectionContext.Provider
      value={{
        sectionName,
        setSectionName,
        subjectName,
        setSubjectName,
        isAdviser,
        setIsAdviser,
        loading,
        setLoading,
        ...state,
        dispatch,
      }}
    >
      {children}
    </SpecificSectionContext.Provider>
  );
};

export function useSpecificSection() {
  return useContext(SpecificSectionContext);
}

export default SpecificSectionContext;
