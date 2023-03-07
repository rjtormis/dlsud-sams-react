import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// Components
import SpecificSectionModals from "../../components/Dashboard/SpecificSection/SpecificSectionModals";
import SpecificSectionResult from "../../components/Dashboard/SpecificSection/SpecificSectionResult";
import SpecificSectionHeader from "../../components/Dashboard/SpecificSection/SpecificSectionHeader";

// Specific

// Hooks
import useFetch from "../../hooks/useFetch";

function SpecificSection() {
  const params = useParams();
  const {
    data: section_edit,
    loading: section_loading,
    error: section_error,
  } = useFetch(`/api/v1/sections/${params.name}`, "section");
  return (
    <>
      {section_loading ? (
        <ClipLoader />
      ) : (
        <>
          <SpecificSectionHeader name={params.name} />

          <SpecificSectionResult />

          <SpecificSectionModals name={params.name} data={section_edit} />
        </>
      )}
    </>
  );
}

export default SpecificSection;
