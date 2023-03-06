import { useContext, useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Components
import DashboardClassroomItem from "../../components/Dashboard/DashboardClassroomItem";

import useFetch from "../../hooks/useFetch";
import AllSectionModal from "../../components/Modals/AllSectionModal";

function AllSection() {
  const [sections, setSections] = useState([]);

  const { data, loading, error } = useFetch("/api/v1/sections", "sections");

  useEffect(() => {
    if (data !== null) {
      setSections(data);
    }
  }, [data]);

  return (
    <>
      <h1 className="text-4xl text-green-800">SECTIONS</h1>
      <div className="flex justify-end">
        <a href="#create" className="btn btn-primary mr-4">
          CREATE
        </a>
        <div className="form-control">
          <form action="">
            <div className="input-group input-group-sm">
              <input type="text" placeholder="Search" className="input input-bordered" />
              <button className="btn btn-primary btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="w-full mt-24 text-center">
          <ClipLoader size={150} />
          <p className="text-2xl">Retrieving data...</p>
          <p>Please wait</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {loading ? (
            <ClipLoader />
          ) : (
            sections.map((section) => (
              <DashboardClassroomItem
                key={section.id}
                title={section.section_full}
                adviser={section.section_adviser}
              />
            ))
          )}
        </div>
      )}

      <AllSectionModal />
    </>
  );
}
export default AllSection;
