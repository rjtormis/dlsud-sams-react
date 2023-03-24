import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd, MdSubject } from "react-icons/md";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
function SpecificSectionHeader() {
  const { sectionName, isAdviser, setFilter } = useSpecificSection();

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
        <div className="tooltip tooltip-primary" data-tip="Handled">
          <button
            className="btn btn-sm btn-ghost btn-square hover:btn-ghost hover:text-green-800"
            onClick={() => setFilter((prevState) => !prevState)}
          >
            <MdSubject size={20} />
          </button>
        </div>
        <div className="tooltip tooltip-primary ml-2" data-tip="Add">
          <a
            href="#create_subject"
            className="btn btn-sm btn-ghost btn-square hover:btn-ghost hover:text-green-800"
          >
            <MdAdd size={20} />
          </a>
        </div>

        {isAdviser ? (
          <>
            <div className="tooltip tooltip-primary" data-tip="Edit">
              <a
                href="#edit_section"
                className="ml-2 btn btn-sm btn-ghost btn-square hover:btn-ghost hover:text-green-800"
              >
                <MdEdit size={20} />
              </a>
            </div>
            <div className="tooltip tooltip-primary" data-tip="Delete">
              <a
                href="#delete_section"
                className="ml-2 btn btn-sm btn-ghost btn-square hover:btn-ghost hover:text-green-800"
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
