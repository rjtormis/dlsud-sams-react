import AllSectionModal from "../../components/Dashboard/AllSection/AllSectionModal";
import AllSectionHeader from "../../components/Dashboard/AllSection/AllSectionHeader";
import AllSectionList from "../../components/Dashboard/AllSection/AllSectionList";
import { AllSectionContextProvider } from "../../context/Dashboard/AllSection/AllSectionContext";

function AllSection() {
  return (
    <>
      <AllSectionContextProvider>
        <AllSectionHeader />
        <AllSectionList />
        <AllSectionModal />
      </AllSectionContextProvider>
    </>
  );
}
export default AllSection;
