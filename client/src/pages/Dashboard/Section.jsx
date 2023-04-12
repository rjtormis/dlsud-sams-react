import { Helmet } from "react-helmet";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

// Components
import SectionModals from "../../components/Dashboard/Section/SectionModals";
import SectionList from "../../components/Dashboard/Section/SectionList";
import SectionHeader from "../../components/Dashboard/Section/SectionHeader";
import Loader from "../../components/Shared/Loader";

// Context
import { useSpecificSection } from "../../context/SpecificSectionContext";

function Section() {
  const params = useParams();

  const { loading, setSectionName, sectionName, dispatch } = useSpecificSection();
  useEffect(() => {
    setSectionName(params.name);
  }, [setSectionName, params.name, dispatch]);

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
          <SectionHeader />

          <SectionList />
        </>
      )}

      <SectionModals />
    </>
  );
}

export default Section;
