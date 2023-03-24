import { Helmet } from "react-helmet";
import { useEffect, useState, useMemo } from "react";

// Components

import AllSectionModal from "../../components/Dashboard/AllSection/AllSectionModal";
import AllSectionHeader from "../../components/Dashboard/AllSection/AllSectionHeader";
import AllSectionList from "../../components/Dashboard/AllSection/AllSectionList";

// Context
import { AllSectionContextProvider } from "../../context/AllSectionContext";
import { useAllSection } from "../../context/AllSectionContext";

function AllSection() {
  /**
   *  ALL SECTION HEADER
   *    contains the header information of the all section page.
   *
   * [toSearch,setToSearch] = a state where the user input on the search bar is saved. It is then used later on
   *
   * { sections, setSection, setNotFound, notFound, setIsModalOpen } = a custom hook that handles state changes.
   *  @param {sections} - Array consisting of all the sections being fetched from the backend.
   *  @param {setSection} - A setter to set or update the sections array.
   *  @param {setNotFound} - A setter to set or update the NotFound which will be used to show an error (input error)
   *  @param {notFound} - A Boolean that checks if the input on "toSearch" is either found or not found.
   *  @param {setIsModalOpen} - A boolean that checks if the "Create" button is clicked and then submitted.
   *
   * memoizedSection - a state where it remembers the initial values or content of the sections array.
   *
   * 1st Use Effect - Checks if the toSearch is not empty. If it is then it clears section object on the AllSectionContext.
   *                - If toSearch is not empty then it iterates through all of the section then finds the input value of toSearch
   *
   * handleChange - a function that handles the changes of the user input. Once a user inputs, it directly sets the inputted value to the "toSearch" state.
   */

  const [toSearch, setToSearch] = useState("");
  const { sections, setSection, setNotFound, notFound, setIsModalOpen } = useAllSection();
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
      <Helmet>
        <title>DLSUD SAMS | ALL SECTIONS</title>
      </Helmet>
      <AllSectionContextProvider>
        <h1 className="text-4xl text-green-800">SECTIONS</h1>
        <div className="flex justify-end">
          <a
            href="#create"
            className="btn btn-md btn-primary mr-4"
            onClick={() => setIsModalOpen(true)}
          >
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
        <AllSectionList />
        <AllSectionModal />
      </AllSectionContextProvider>
    </>
  );
}
export default AllSection;
