import HashLoader from "react-spinners/HashLoader";

// Components
import DashboardClassroomItem from "../../Shared/DashboardClassroomItem";
import Loader from "../../Shared/Loader";

// Context
import { useAllSection } from "../../../context/AllSectionContext";

function AllSectionList() {
  const { sections, loading } = useAllSection();
  return (
    <>
      {loading ? (
        <Loader
          type={<HashLoader className="m-auto" color="#436147" size={120} />}
          style_div="w-full mt-24 text-center"
          style_msg="text-2xl"
        />
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
