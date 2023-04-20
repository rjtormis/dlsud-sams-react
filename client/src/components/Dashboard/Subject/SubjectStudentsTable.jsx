import { aws_user_url } from "../../../utilities/Helper";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useState } from "react";
function SubjectStudentsTable() {
  const { subject } = useSpecificSection();

  const [total, setTotal] = useState(subject.enrolled.total_attendance);
  const [editAttendance, setEditAttendance] = useState(false);
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
        {subject.enrolled.map((sub) => (
          <tr className="" key={sub.name}>
            <td className="z-10">
              <div className="flex items-center space-x-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img className="" src={aws_user_url + sub.profile} alt="" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-sm">{sub.name}</div>
                </div>
              </div>
            </td>
            <td className="text-center text-sm">{sub.emailAddress}</td>
            <td className="text-center text-sm">{sub.studentNo}</td>
            <td className="text-center text-sm">
              {editAttendance ? (
                <input type="text" className="input input-xs input-primary m-auto" />
              ) : (
                sub.total_attendance
              )}
            </td>
            <td className="text-center text-sm">
              <div className="">
                <div className="tooltip tooltip-warning mr-3" data-tip="Edit">
                  <button onClick={() => setEditAttendance(!editAttendance)}>
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
        ))}
      </tbody>
    </table>
  );
}

export default SubjectStudentsTable;
