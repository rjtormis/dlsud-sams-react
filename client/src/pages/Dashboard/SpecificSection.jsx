import { Helmet } from "react-helmet";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

// Components
import SpecificSectionModals from "../../components/Dashboard/SpecificSection/SpecificSectionModals";
import SpecificSectionList from "../../components/Dashboard/SpecificSection/SpecificSectionList";
import SpecificSectionHeader from "../../components/Dashboard/SpecificSection/SpecificSectionHeader";
import Loader from "../../components/Shared/Loader";

// Context
import { useSpecificSection } from "../../context/SpecificSectionContext";

function SpecificSection() {
  const params = useParams();
  const { loading, setSectionName, sectionName, setLoading } = useSpecificSection();
  console.log(sectionName);
  useEffect(() => {
    setSectionName(params.name);
  }, [setSectionName, params.name]);

  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | {sectionName}</title>
      </Helmet>
      {loading ? (
        <Loader
          type={<HashLoader className="m-auto" color="#436147" size={120} />}
          style_div="w-full m-auto text-center"
          style_msg="text-2xl"
        />
      ) : (
        <>
          <SpecificSectionHeader />

          <SpecificSectionList />

          <SpecificSectionModals />
        </>
      )}
    </>
  );
}

export default SpecificSection;
