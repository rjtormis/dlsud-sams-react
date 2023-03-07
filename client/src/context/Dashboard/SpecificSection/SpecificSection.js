import { createContext } from "react";

const SpecificSectionContext = createContext();

export const SpecificSectionContextProvider = ({ children }) => {
  const initialValues = {
    subjects: [],
    isAdviser: false,
  };
  return <SpecificSectionContext.Provider>{children}</SpecificSectionContext.Provider>;
};

export default SpecificSectionContext;
