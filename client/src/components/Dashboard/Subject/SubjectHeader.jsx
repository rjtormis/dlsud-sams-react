import { Link } from "react-router-dom";
import useSpecificSection from "../../../hooks/useSpecificSection";
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

      <div className="flex mb-4">
        <h1 className="text-md">COURSE CODE: {subject.code}</h1>
      </div>
    </>
  );
}

export default SubjectHeader;
