import { MdDelete, MdEdit, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function SpecificSectionResult({ name }) {
  return (
    <>
      <div id="subject-container" className="flex-1 mt-2 rounded-t-lg">
        <div className="bg-green-800 p-2 rounded-t-lg">
          <button className=" btn btn-sm text-black mr-4">ALL</button>
          <button className="text-white">HANDLED</button>
        </div>
        <div className="grid grid-cols-4 p-2 gap-4">
          <div id="subject" className="card card-compact w-full  shadow-xl text-white">
            <div className="card-body flex">
              <h2 className="card-title">Software Engineering</h2>
              <p>Professor: TITA R HERRADURA</p>
              <p>Schedule: TITA R HERRADURA</p>
              <div className="card-actions justify-end">
                <Link
                  to={`/dashboard/sections/${name}/test`}
                  className="btn btn-white btn-square btn-xs"
                >
                  <MdOutlineKeyboardArrowRight size={16} />
                </Link>
                <button className="btn btn-white btn-square btn-xs">
                  <MdEdit size={16} />
                </button>
                <button className="btn btn-white btn-square btn-xs">
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

export default SpecificSectionResult;
