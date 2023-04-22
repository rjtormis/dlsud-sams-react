import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete, AiOutlineCheck } from "react-icons/ai";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useState } from "react";

// Utils
import { aws_user_url } from "../../../utilities/Helper";
import { useAuth } from "../../../context/AuthContext";

function SubjectStudentsTable() {
  const { subject, setStudentToRemove, setSubjectToRemove } = useSpecificSection();
  const { auth } = useAuth();
  const [total, setTotal] = useState(0);
  const [editAttendance, setEditAttendance] = useState(false);
  const [studentNo, setStudentNo] = useState("");
  const onEdit = (id, attendance) => {
    setEditAttendance(!editAttendance);
    if (editAttendance === true) {
      setStudentNo(id);
      setTotal(attendance);
    } else {
      setStudentNo("");
    }
  };
  const handleChange = (e) => {
    setTotal(e.currentTarget.value);
  };

  const handleRemove = (studentNo, code) => {
    setStudentToRemove(studentNo);
    setSubjectToRemove(code);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `/api/v1/subjects/${subject.code}/${studentNo}/enrolled`,
        { total: total },
        { headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token } }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <table className="table w-full">
        <thead className="relative z-20">
          <tr className="sticky top-0">
            <th className="text-center bg-secondary text-white">Name</th>
            <th className="text-center bg-secondary text-white">Email</th>
            <th className="text-center bg-secondary text-white">Student ID</th>
            <th className="text-center bg-secondary text-white">Total Att.</th>
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
              <td className="text-center text-sm w-[150px]">
                <input
                  type="text"
                  className={`${
                    studentNo === sub.studentNo ? "" : "hidden"
                  } input input-xs input-primary m-auto text-center w-1/2`}
                  value={total}
                  onChange={(e) => handleChange(e)}
                />
                <p className={studentNo === sub.studentNo ? "hidden" : ""}>
                  {sub.total_attendance}
                </p>
              </td>
              <td className="text-center text-sm">
                <div className="">
                  <div
                    className={` ${
                      studentNo === sub.studentNo ? "" : "hidden"
                    } tooltip tooltip-success mr-3`}
                    data-tip="Save"
                  >
                    <form action="" onSubmit={handleSubmit}>
                      <button type="submit" id={sub.studentNo}>
                        <AiOutlineCheck size={16} className="" color="input-primary" />
                      </button>
                    </form>
                  </div>
                  <div className="tooltip tooltip-warning mr-3" data-tip="Edit">
                    <button
                      id={sub.studentNo}
                      onClick={() => onEdit(sub.studentNo, sub.total_attendance)}
                    >
                      <FiEdit2 size={16} className="" color="#E68405" />
                    </button>
                  </div>
                  <div className="tooltip tooltip-error" data-tip="Remove">
                    <a
                      href="#remove_student"
                      onClick={() => handleRemove(sub.studentNo, subject.code)}
                    >
                      <AiFillDelete size={16} color="#E94951" />
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default SubjectStudentsTable;
