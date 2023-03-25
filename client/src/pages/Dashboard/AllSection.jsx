import { Helmet } from "react-helmet";
import { useEffect, useState, useMemo } from "react";

// Components

import AllSectionModal from "../../components/Dashboard/AllSection/AllSectionModal";
import AllSectionHeader from "../../components/Dashboard/AllSection/AllSectionHeader";
import AllSectionList from "../../components/Dashboard/AllSection/AllSectionList";

// Context
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
