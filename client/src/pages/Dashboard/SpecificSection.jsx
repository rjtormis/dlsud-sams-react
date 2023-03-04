import { useParams, Link, useNavigate } from "react-router-dom";
import bg from "../../assets/bg.jpg";

import { MdDelete, MdEdit, MdAdd, MdOutlineKeyboardArrowRight } from "react-icons/md";
function SpecificSection() {
  const params = useParams();
  const navigate = useNavigate();

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
      <div className="flex justify-end">
        <div className="tooltip tooltip-primary" data-tip="Add subject">
          <a href="#" className="btn btn-sm btn-ghost btn-square hover:btn-primary">
            <MdAdd size={20} />
          </a>
        </div>
        <div className="tooltip tooltip-primary" data-tip="Edit">
          <a href="#" className="ml-2 btn btn-sm btn-ghost btn-square hover:btn-primary">
            <MdEdit size={20} />
          </a>
        </div>
        <div className="tooltip tooltip-primary" data-tip="Delete">
          <a href="#" className="ml-2 btn btn-sm btn-ghost btn-square hover:btn-primary">
            <MdDelete size={18} />
          </a>
        </div>
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
    </>
  );
}

export default SpecificSection;
