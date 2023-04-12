import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import sample from "../../../assets/sample-profile.jfif";
function SubjectStudentsTable() {
  return (
    <table className="table w-full">
      <thead className="relative z-20">
        <tr className="sticky top-0">
          <th className="text-center bg-secondary text-white">Name</th>
          <th className="text-center bg-secondary text-white">Email</th>
          <th className="text-center bg-secondary text-white">Student ID</th>
          <th className="text-center bg-secondary text-white">Total Attendance</th>
          <th className="text-center bg-secondary text-white">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr className="">
          <td className="z-10">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img className="" src={sample} alt="" />
                </div>
              </div>
              <div>
                <div className="font-bold text-sm">TEST ME</div>
              </div>
            </div>
          </td>
          <td className="text-center text-sm">trd1240@dlsud.edu.ph</td>
          <td className="text-center text-sm">201931240</td>
          <td className="text-center text-sm">12</td>
          <td className="text-center text-sm">
            <div className="">
              <div className="tooltip tooltip-warning mr-3" data-tip="Edit">
                <button>
                  <FiEdit2 size={16} className="" color="#E68405" />
                </button>
              </div>
              <div className="tooltip tooltip-error" data-tip="Remove">
                <button>
                  <AiFillDelete size={16} color="#E94951" />
                </button>
              </div>
            </div>
          </td>
        </tr>
        <tr className="">
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  <img
                    src="https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg"
                    alt=""
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">TEST ME</div>
                <div className="text-sm opacity-50">CS DEPARTMENT</div>
              </div>
            </div>
          </td>
          <td className="text-center text-sm">trd1240@dlsud.edu.ph</td>
          <td className="text-center text-sm">201931240</td>
          <td className="text-center text-sm">12</td>
          <td className="text-center text-sm">REMOVE</td>
        </tr>
      </tbody>
    </table>
  );
}

export default SubjectStudentsTable;
