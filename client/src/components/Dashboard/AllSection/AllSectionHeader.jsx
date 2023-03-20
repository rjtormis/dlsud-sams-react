import { useState, useMemo, useEffect } from "react";
import { useAllSection } from "../../../context/AllSectionContext";

function AllSectionHeader() {
  const [toSearch, setToSearch] = useState("");
  const { sections, setSection, setNotFound, notFound } = useAllSection();
  const memoizedSection = useMemo(() => sections, [sections]);

  useEffect(() => {
    if (toSearch === "") {
      setNotFound(false);
      setSection({});
    } else {
      const searchSection = memoizedSection.find(
        (section) => section.section_full === toSearch.toUpperCase()
      );
      if (searchSection) {
        setNotFound(false);
        setSection(searchSection);
      } else {
        setNotFound(true);
      }
    }
  }, [toSearch, setSection, memoizedSection, setNotFound]);

  const handleChange = (e) => {
    setToSearch(e.currentTarget.value);
  };

  return (
    <>
      <h1 className="text-4xl text-green-800">SECTIONS</h1>
      <div className="flex justify-end">
        <a href="#create" className="btn btn-md btn-primary mr-4">
          CREATE
        </a>

        <input
          type="text"
          placeholder="Search"
          className={`input input-md input-bordered ${notFound ? "input-error" : ""}`}
          value={toSearch}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default AllSectionHeader;
