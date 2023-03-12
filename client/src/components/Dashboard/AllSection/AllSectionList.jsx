import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

// Components
import DashboardClassroomItem from "../../Shared/DashboardClassroomItem";

// Hooks
import useFetch from "../../../hooks/useFetch";
import useAllSection from "../../../hooks/useAllSection";

function AllSectionList() {
  const { sections, loading, dispatch } = useAllSection();
  return (
    <>
      {loading ? (
        <div className="w-full mt-24 text-center">
          <ClipLoader size={150} />
          <p className="text-2xl">Retrieving data...</p>
          <p>Please wait</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {sections.map((section) => (
            <DashboardClassroomItem
              key={section.id}
              title={section.section_full}
              adviser={section.section_adviser}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default AllSectionList;
