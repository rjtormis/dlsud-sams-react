import { useContext } from "react";
import AllSectionContext from "../context/Dashboard/AllSection/AllSectionContext";

function useAllSection() {
  return useContext(AllSectionContext);
}

export default useAllSection;
