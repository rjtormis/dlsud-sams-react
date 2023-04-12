import { Helmet } from "react-helmet";
import { useEffect, useState, useMemo } from "react";

// Components

import SectionsModal from "../../components/Dashboard/Sections/SectionsModal";
import SectionsHeader from "../../components/Dashboard/Sections/SectionsHeader";
import SectionsList from "../../components/Dashboard/Sections/SectionsList";

// Context
import { AllSectionContextProvider } from "../../context/AllSectionContext";

function AllSection() {
  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | ALL SECTIONS</title>
      </Helmet>
      <AllSectionContextProvider>
        <SectionsHeader />
        <SectionsList />
        <SectionsModal />
      </AllSectionContextProvider>
    </>
  );
}
export default AllSection;
