import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// Components
import SpecificSectionModals from "../../components/Dashboard/SpecificSection/SpecificSectionModals";
import SpecificSectionResult from "../../components/Dashboard/SpecificSection/SpecificSectionResult";
import SpecificSectionHeader from "../../components/Dashboard/SpecificSection/SpecificSectionHeader";

// Context
import { useSpecificSection } from "../../context/SpecificSectionContext";

function SpecificSection() {
  const params = useParams();
  const { loading, setSectioName } = useSpecificSection();

  useEffect(() => {
    setSectioName(params.name);
  }, [setSectioName, params.name]);
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
