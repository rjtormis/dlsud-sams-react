import axios from "axios";
import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete, AiOutlineCheck, AiOutlineQuestionCircle } from "react-icons/ai";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

// Utils
import { aws_user_url } from "../../../utilities/Helper";
import { useAuth } from "../../../context/AuthContext";
import { ObjectIsEmpty } from "../../../utilities/Helper";
import { useProfile } from "../../../context/ProfileContext";
import { useLocation, useNavigate } from "react-router-dom";
if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}

function SubjectStudentsTable() {
  const { auth, setPrevLoc } = useAuth();
  const { setProfID } = useProfile();
  const [total, setTotal] = useState(0);
  const [editAttendance, setEditAttendance] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    section,
    subject,
    setStudentToRemove,
    setSubjectToRemove,
    search,
    result,
    setRefetch,
    setIsModalOpen,
    subcode,
    sectionName,
    fetchData,
    setFetchData,
    studentNo,
    setStudentNo,
  } = useSpecificSection();

  const [dup, setDup] = useState(subject);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/v1/sections/${sectionName}`, {
          headers: { Authorization: `Bearer ${auth.access_token}` },
        });
        const data = response.data.section.subjects.filter(({ code }) => code === subcode)[0];
        setDup(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    if (fetchData) {
      fetch();
      setFetchData(false);
    }
  }, [fetchData, dup, auth, sectionName, setFetchData, subcode]);

  const onEdit = (id) => {
    setIsModalOpen(true);
    setStudentNo(id);
  };
  const handleChange = (e) => {
    setTotal(e.currentTarget.value);
  };

  const handleRemove = (studentNo, code) => {
    setStudentToRemove(studentNo);
    setSubjectToRemove(code);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `/api/v1/subjects/${subject.code}/${studentNo}/enrolled`,
        { total: total },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      subject.enrolled.map((student) =>
        student.studentNo === response.data.studentNo
          ? (student.total_attendance = response.data.total_attendance)
          : ""
      );
      onEdit(response.data.studentNo, response.data.total_attendance);
      setRefetch(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = (id) => {
    setPrevLoc(location.pathname);
    setProfID(id);
    navigate(`/dashboard/profile/${id}`);
  };
  return (
    <>
      {loading ? (
        <div className="flex justify-center h-full">
          <ClipLoader className="my-auto" size={40} />
        </div>
      ) : (
        <table className="table w-full">
          <thead className="relative">
            <tr className="sticky top-0 z-10">
              <th className="text-center bg-secondary text-white cursor-default">Name</th>
              <th className="text-center bg-secondary text-white cursor-default">Email</th>
              <th className="text-center bg-secondary text-white cursor-default">Student ID</th>
              <th className="text-center bg-secondary text-white">
                <p
                  className="tooltip tooltip-bottom tooltip-accent tex cursor-pointer"
                  data-tip="Attendance recorded today"
                >
                  MARKED
                </p>
              </th>
              <th className="text-center bg-secondary text-white">
                <p
                  className="tooltip tooltip-bottom tooltip-accent tex cursor-pointer"
                  data-tip="Total attendance"
                >
                  Total Att.
                </p>
              </th>
              <th className="text-center bg-secondary text-white cursor-default">Total Absent</th>
              <th className="text-center bg-secondary text-white cursor-default">Actions</th>
            </tr>
          </thead>

          <tbody>
            {search === "" ? (
              dup.enrolled.map((sub) => (
                <tr className="" key={sub.name}>
                  <td
                    className="z-10 hover:cursor-pointer hover:bg-gray-100 hover:text-secondary w-[150px]"
                    onClick={() => handleClick(sub.id)}
                  >
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
                  <td className="text-center text-sm w-[150px]">{sub.emailAddress}</td>
                  <td className="text-center text-sm">{sub.studentNo}</td>
                  <td className="text-center text-sm">{sub.marked}</td>
                  <td className="text-center text-sm">
                    <p className="">{sub.total_attendance}</p>
                  </td>
                  <td className="text-center text-sm">
                    <p className="">{sub.total_absent} </p>
                  </td>
                  <td className="text-center text-sm">
                    <div className="">
                      <div className="tooltip tooltip-warning mr-2" data-tip="Edit">
                        <a href="#edit_student" onClick={() => onEdit(sub.studentNo)}>
                          <FiEdit2 size={16} className="" color="#E68405" />
                        </a>
                      </div>
                      <div className={`tooltip tooltip-error`} data-tip="Remove">
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
              ))
            ) : ObjectIsEmpty(result) ? (
              <tr className="">
                <h1 className="text-center font-[900]">Student record does not exist</h1>
              </tr>
            ) : (
              <tr className="" key={result.name}>
                <td
                  className="z-10 hover:cursor-pointer hover:bg-gray-100 hover:text-secondary w-[150px]"
                  onClick={() => handleClick(result.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img className="" src={aws_user_url + result.profile} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-sm">{result.name}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center text-sm w-[150px]">{result.emailAddress}</td>
                <td className="text-center text-sm">{result.studentNo}</td>
                <td className="text-center text-sm">
                  <input
                    type="text"
                    className={`${
                      studentNo === result.studentNo ? "" : "hidden"
                    } input input-xs input-primary m-auto text-center w-[60px]`}
                    value={total}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className={studentNo === result.studentNo ? "hidden" : ""}>
                    {result.total_attendance}
                  </p>
                </td>
                <td className="text-center text-sm">
                  <input
                    type="text"
                    className={`${
                      studentNo === result.studentNo ? "" : "hidden"
                    } input input-xs input-primary m-auto text-center w-[60px]`}
                    value={total}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className={studentNo === result.studentNo ? "hidden" : ""}>
                    {result.total_attendance}
                  </p>
                </td>
                <td className="text-center text-sm">
                  <div className="">
                    <div className="tooltip tooltip-warning mr-2" data-tip="Edit">
                      <button
                        id={result.studentNo}
                        onClick={() => onEdit(result.studentNo, result.total_attendance)}
                      >
                        <FiEdit2 size={16} className="" color="#E68405" />
                      </button>
                    </div>
                    <div
                      className={`tooltip tooltip-${editAttendance ? "error" : "success"}`}
                      data-tip={`${editAttendance ? "Remove" : "Save"}`}
                    >
                      {!editAttendance && result.studentNo === studentNo ? (
                        <form action="" onSubmit={handleSubmit}>
                          <button type="submit" id={result.studentNo}>
                            <AiOutlineCheck size={16} className="" color="input-primary" />
                          </button>
                        </form>
                      ) : (
                        <a
                          href="#remove_student"
                          onClick={() => handleRemove(result.studentNo, subject.code)}
                        >
                          <AiFillDelete size={16} color="#E94951" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}

export default SubjectStudentsTable;
