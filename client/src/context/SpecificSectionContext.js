import { createContext, useEffect, useReducer, useContext, useState } from "react";
import SpecificSectionReducer from "../reducers/SpecificSectionReducer";

// Actions
import { fetchSpecificSectionDetails } from "../actions/SpecificSection";

const SpecificSectionContext = createContext();

export const SpecificSectionContextProvider = ({ children }) => {
  //
  const [sectionName, setSectionName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [isAdviser, setIsAdviser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(false);

  const resetState = () => {
    setSectionName("");
    setSubjectName("");
    setFetchData(false);
    setIsAdviser(false);
    setLoading(false);
    setFilter(false);
  };

  const initialValues = {
    section: {},
    subject: {},
    editSubject: {},
    enrolled: [],
  };

  const [state, dispatch] = useReducer(SpecificSectionReducer, initialValues);

  // Fetch section details
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        setLoading(true);
        const [section, adviser] = await fetchSpecificSectionDetails(sectionName);
        dispatch({ type: "SET_SECTION", payload: section.data.section });
        setIsAdviser(adviser.data.isAdviser);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };

    if (sectionName !== "") {
      fetchSectionData();
    }

    if (fetchData) {
      fetchSectionData();
      setFetchData(false);
    }
  }, [sectionName, fetchData]);

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
        filter,
        setFilter,
        fetchData,
        setFetchData,
        resetState,
        isModalOpen,
        setIsModalOpen,
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
