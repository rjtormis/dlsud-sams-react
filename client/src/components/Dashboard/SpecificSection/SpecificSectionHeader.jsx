import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";

// Hooks
import useFetch from "../../../hooks/useFetch";

function SpecificSectionHeader({ name }) {
  const { data, error, loading } = useFetch(`/api/v1/sections/${name}/adviser`, "isAdviser");
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
            <p className=" text-green-800">{name}</p>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <div className="tooltip tooltip-primary" data-tip="Add">
          <a href="#create_subject" className="btn btn-sm btn-ghost btn-square hover:btn-primary">
            <MdAdd size={20} />
          </a>
        </div>
        {data ? (
          <>
            <div className="tooltip tooltip-primary" data-tip="Edit">
              <a
                href="#edit_section"
                className="ml-2 btn btn-sm btn-ghost btn-square hover:btn-primary"
              >
                <MdEdit size={20} />
              </a>
            </div>
            <div className="tooltip tooltip-primary" data-tip="Delete">
              <a
                href="#delete_section"
                className="ml-2 btn btn-sm btn-ghost btn-square hover:btn-primary"
              >
                <MdDelete size={18} />
              </a>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default SpecificSectionHeader;
