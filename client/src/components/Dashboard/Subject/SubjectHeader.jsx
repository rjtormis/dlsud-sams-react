import { Link } from "react-router-dom";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";

function SubjectHeader() {
  const { subject } = useSpecificSection();
  return (
    <>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard/sections" className=" text-green-800">
              Sections
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/sections/${subject.section}`} className=" text-green-800">
              {subject.section}
            </Link>
          </li>
          <li>
            <p className=" text-green-800">{subject.subject_name}</p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SubjectHeader;
