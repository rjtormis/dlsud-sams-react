import { Helmet } from "react-helmet";

import AllSectionModal from "../../components/Dashboard/AllSection/AllSectionModal";
import AllSectionHeader from "../../components/Dashboard/AllSection/AllSectionHeader";
import AllSectionList from "../../components/Dashboard/AllSection/AllSectionList";
import { AllSectionContextProvider } from "../../context/AllSectionContext";
function AllSection() {
  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | ALL SECTIONS</title>
      </Helmet>
      <AllSectionContextProvider>
        <AllSectionHeader />
        <AllSectionList />
        <AllSectionModal />
      </AllSectionContextProvider>
    </>
  );
}
export default AllSection;
