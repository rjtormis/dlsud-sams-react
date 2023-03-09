import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd } from "react-icons/md";

// Hooks
import useSpecificSection from "../../../hooks/useSpecificSection";
function SpecificSectionHeader() {
  const { sectionName, isAdviser } = useSpecificSection();

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
            <p className=" text-green-800">{sectionName}</p>
          </li>
        </ul>
      </div>

      <div className="flex justify-end">
        <div className="tooltip tooltip-primary" data-tip="Add">
          <a href="#create_subject" className="btn btn-sm btn-ghost btn-square hover:btn-primary">
            <MdAdd size={20} />
          </a>
        </div>
        {isAdviser ? (
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
