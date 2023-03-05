import { useParams, Link, useNavigate } from "react-router-dom";
import { MdDelete, MdEdit, MdAdd, MdOutlineKeyboardArrowRight } from "react-icons/md";
import SpecificSectionModals from "../../components/Modals/SpecificSectionModals";
import ClipLoader from "react-spinners/ClipLoader";
import useFetch from "../../hooks/useFetch";

function SpecificSection() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, error, loading } = useFetch(`/api/v1/sections/${params.name}/adviser`, "isAdviser");
  return (
    <>
      <div class="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard/sections" className=" text-green-800">
              Sections
            </Link>
          </li>
          <li>
            <p className=" text-green-800">{params.name}</p>
          </li>
        </ul>
      </div>
      {loading ? (
        <div className="flex-1 flex flex-col justify-center">
          <ClipLoader size={150} className="mx-auto" />
          <h3 className="mx-auto text-2xl">Loading section...</h3>
          <p className="mx-auto">Please wait</p>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <div className="tooltip tooltip-primary" data-tip="Add">
              <a
                href="#create_subject"
                className="btn btn-sm btn-ghost btn-square hover:btn-primary"
              >
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
          <div id="subject-container" className="flex-1 mt-2 rounded-t-lg">
            <div className="bg-green-800 p-2 rounded-t-lg">
              <button className=" btn btn-sm text-black mr-4">ALL</button>
              <button className="text-white">HANDLED</button>
            </div>
            <div className="grid grid-cols-4 p-2 gap-4">
              <div id="subject" class="card card-compact w-full  shadow-xl text-white">
                <div class="card-body flex">
                  <h2 class="card-title">Software Engineering</h2>
                  <p>Professor: TITA R HERRADURA</p>
                  <p>Schedule: TITA R HERRADURA</p>
                  <div class="card-actions justify-end">
                    <button class="btn btn-white btn-square btn-xs">
                      <MdOutlineKeyboardArrowRight size={16} />
                    </button>
                    <button class="btn btn-white btn-square btn-xs">
                      <MdEdit size={16} />
                    </button>
                    <button class="btn btn-white btn-square btn-xs">
                      <MdDelete size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SpecificSectionModals name={params.name} />
        </>
      )}
    </>
  );
}

export default SpecificSection;
