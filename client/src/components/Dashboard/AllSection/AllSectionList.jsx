import HashLoader from "react-spinners/HashLoader";
import { FaSadCry } from "react-icons/fa";

// Components
import AllSectionItem from "./AllSectionItem";
import AllSectionPagination from "../AllSection/AllSectionPagination";
import Loader from "../../Shared/Loader";

// Context
import { useAllSection } from "../../../context/AllSectionContext";
import { useState } from "react";
import { ObjectIsEmpty } from "../../../utilities/Helper";

function AllSectionList() {
  const { sections, section, loading, notFound } = useAllSection();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(8);

  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const currentItemIndex = sections.slice(firstItemIndex, lastItemIndex);

  const user_search = ObjectIsEmpty(section);
  return (
    <>
      {loading ? (
        <Loader
          type={<HashLoader className="m-auto" color="#436147" size={120} />}
          style_div="w-full mt-24 text-center"
          style_msg="text-2xl"
        />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {user_search ? (
              currentItemIndex.map((section) => (
                <AllSectionItem
                  key={section.id}
                  title={section.section_full}
                  adviser={section.section_adviser}
                  image_link={section.section_image_link}
                />
              ))
            ) : (
              <AllSectionItem
                key={section.id}
                title={section.section_full}
                adviser={section.section_adviser}
                image_link={section.section_image_link}
              />
            )}
          </div>
          {user_search ? (
            <AllSectionPagination
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
      )}
    </>
  );
}

export default AllSectionList;
