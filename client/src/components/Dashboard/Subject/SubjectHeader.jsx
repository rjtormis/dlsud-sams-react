import { Link } from "react-router-dom";
function SubjectHeader({ name, subject_name }) {
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
            <Link to={`/dashboard/sections/${name}`} className=" text-green-800">
              {name}
            </Link>
          </li>
          <li>
            {" "}
            <p className=" text-green-800">{subject_name}</p>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <h1 className="text-md">COURSE CODE: 123456</h1>
      </div>
    </>
  );
}

export default SubjectHeader;
