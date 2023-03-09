import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// Components
import SpecificSectionModals from "../../components/Dashboard/SpecificSection/SpecificSectionModals";
import SpecificSectionResult from "../../components/Dashboard/SpecificSection/SpecificSectionResult";
import SpecificSectionHeader from "../../components/Dashboard/SpecificSection/SpecificSectionHeader";

// context
import { SpecificSectionContextProvider } from "../../context/Dashboard/SpecificSection/SpecificSectionContext";

// Hooks
import useFetch from "../../hooks/useFetch";
import useSpecificSection from "../../hooks/useSpecificSection.js";
import { useEffect } from "react";

function SpecificSection() {
  const params = useParams();
  const { loading, dispatch } = useSpecificSection();
  useEffect(() => {
    dispatch({ type: "SET_SECTION_NAME", payload: params.name });
  }, [dispatch, params.name]);
  return (
    <>
      {loading ? (
        <ClipLoader />
      ) : (
        <>
          <SpecificSectionHeader />

          <SpecificSectionResult />

          <SpecificSectionModals />
        </>
      )}
    </>
  );
}

export default SpecificSection;
