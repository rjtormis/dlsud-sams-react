import HashLoader from "react-spinners/HashLoader";
import { FaSadCry } from "react-icons/fa";

// Components
import SectionsItem from "./SectionsItem";
import SectionsPagination from "../Sections/SectionsPagination";
import Loader from "../../Shared/Loader";

// Context
import { useAllSection } from "../../../context/AllSectionContext";
import { useState } from "react";
import { ObjectIsEmpty } from "../../../utilities/Helper";

function SectionsList() {
  const { sections, section, loading } = useAllSection();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(8);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentItemIndex = sections.slice(firstItemIndex, lastItemIndex);

  if (loading) {
    return (
      <div className="flex-1 flex">
        <Loader
          type={<HashLoader className="m-auto" color="#436147" size={120} />}
          style_div="w-full text-center m-auto"
          style_msg="text-xl"
        />
      </div>
    );
  }

  const user_search = ObjectIsEmpty(section);
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {user_search ? (
          currentItemIndex.map((section) => (
            <SectionsItem
              key={section.id}
              title={section.section_full}
              adviser={section.section_adviser}
              image_link={section.section_image_link}
            />
          ))
        ) : (
          <SectionsItem
            key={section.id}
            title={section.section_full}
            adviser={section.section_adviser}
            image_link={section.section_image_link}
          />
        )}
      </div>
      {user_search ? (
        <SectionsPagination
          style_div={currentItemIndex.length < 5 ? "absolute bottom-5" : "block"}
          totalItems={sections.length}
          ItemPerPage={itemPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default SectionsList;
