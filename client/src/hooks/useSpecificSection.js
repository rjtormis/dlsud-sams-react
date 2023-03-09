import { useContext } from "react";
import SpecificSectionContext from "../context/Dashboard/SpecificSection/SpecificSectionContext";

function useSpecificSection() {
  return useContext(SpecificSectionContext);
}

export default useSpecificSection;
