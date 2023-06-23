import axios from "axios";
import { AiFillCheckCircle, AiOutlineDownload, AiTwotoneTrophy } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useAuth } from "../../../context/AuthContext";

// Components
import Modal from "../../Shared/Modal";
import SubjectStudentsTable from "./SubjectStudentsTable";
import SubjectLeaderboardTable from "./SubjectLeaderboardTable";
import CustomSelect from "../../Shared/CustomSelect";
import { getCurrentDate } from "../../../utilities/Helper";
import { editRecordSchema } from "../../../schemas/EditRecordSchema";
if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}

function SubjectBody() {
  const {
    subject,
    studentToRemove,
    subjectToRemove,
    search,
    setSearch,
    setResult,
    setFetchData,
    isModalOpen,
    setIsModalOpen,
    setSubCode,
    studentNo,
  } = useSpecificSection();
  const { auth } = useAuth();

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let current = `${day}-${month}-${year}`;

  const generateCSV = (section, subName, data) => {
    const header = ["Section", "Subject", "Date"];
    const rows = [
      [section, subName, current],
      ["Name", "Student ID", "Total Attendance"],
      ...data.map(({ name, studentNo, total_attendance }) => [name, studentNo, total_attendance]),
    ];
    return [header, ...rows].map((row) => row.join(",")).join("\n");
  };

  const downloadCSV = () => {
    const csvData = generateCSV(subject.section, subject.subject_name, subject.enrolled);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${subject.subject_name}_${current}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`/api/v1/subjects/${subjectToRemove}/${studentToRemove}/enrolled`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.access_token}`,
        },
      });
      const test = subject.enrolled.filter((student) => student.studentNo !== studentToRemove);
      subject.enrolled = test;
      setIsModalOpen(false);
    } catch (e) {
      setIsModalOpen(false);

      console.log(e);
    }
  };

  const handleEditRecord = async (state, action) => {
    try {
      const response = await axios.post(
        "/api/v1/edit_attendance",
        { ...state },
        { headers: { Authorization: `Bearer ${auth.access_token}` } }
      );
      if (
        response.data.msg === "Student already has attendance recorded" ||
        response.data.msg === "Record does not exists" ||
        response.data.msg === "Student already has absent recorded"
      ) {
        action.setFieldError("type", response.data.msg);
        action.setFieldError("date", "‎");
        setIsModalOpen(true);
      } else {
        setIsModalOpen(false);
      }
    } catch (e) {
      setIsModalOpen(true);
      console.log(e);
    }
  };

  useEffect(() => {
    if (search === "") {
      setResult({});
    } else {
      const test = subject.enrolled.filter(
        (student) =>
          search === student.studentNo || search === student.name || search === student.emailAddress
      )[0];
      if (test !== undefined) {
        setResult(test);
      }
    }
  }, [search, subject, setResult]);

  return (
    <div className="flex-1">
      <div className="">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div className="flex justify-between mb-2">
              <div>
                <h1 className="text-2xl text-primary">STUDENTS ENROLLED</h1>
                <h1 className="text-xs">COURSE CODE: {subject.code}</h1>
              </div>
              <div className="mr-2">
                <div className="flex m-auto justify-end">
                  <div className="tooltip tooltip-primary mr-2" data-tip="Start attendance">
                    <Link
                      to={`/dashboard/sections/${subject.section}/${subject.subject_name}/attendance`}
                    >
                      <AiFillCheckCircle size={20} />
                    </Link>
                  </div>
                  <div className="tooltip tooltip-primary mr-2" data-tip="Download">
                    <button onClick={downloadCSV}>
                      <AiOutlineDownload size={20} />
                    </button>
                  </div>
                  <div className="tooltip tooltip-primary mr-2" data-tip="Refresh">
                    <button
                      onClick={() => {
                        setFetchData(true);
                        setSubCode(subject.code);
                      }}
                    >
                      <BiRefresh size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    className="input input-xs input-primary"
                    placeholder="Search student"
                    value={search}
                    onChange={(e) => setSearch(e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
            <div className=" overflow-y-auto h-[520px] ">
              <SubjectStudentsTable />
            </div>
          </div>
          <div className="ml-4">
            <header>
              <h1 className="text-2xl flex">
                LEADERBOARD
                <span className="ml-4">
                  <AiTwotoneTrophy className="" />
                </span>
              </h1>
              <h1 className="text-xs flex">DATE : {getCurrentDate("table")} </h1>
            </header>
            <div className="h-[510px] overflow-y-auto">
              <SubjectLeaderboardTable />
            </div>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <>
          <Modal id="remove_student">
            <div className="flex">
              <AiFillDelete size={30} className="my -auto mr-4" color="#E94951" />
              <h1 className="text-xl font-[900]">Remove Student</h1>
            </div>
            <div className="w-full mt-4">
              <p className="text-center">Would you like to remove {studentToRemove}?</p>
              <form className="mt-4" onSubmit={handleSubmit}>
                <button type="submit" value="" className="btn btn-error w-full">
                  Remove
                </button>
              </form>
            </div>
          </Modal>

          <Modal id="edit_student">
            <div className="flex">
              <BsFillCreditCard2FrontFill size={30} className="my -auto mr-4" color="#E68405" />
              <h1 className="text-xl font-[900]">Edit Records </h1>
            </div>
            <div>
              <div className="w-full mt-4">
                <p className="">Edit Records for {studentNo}?</p>
                <Formik
                  initialValues={{
                    studentNo: studentNo,
                    code: subject.code,
                    type: "",
                    qDate: "",
                    time: getCurrentDate("attendance").split(" ")[1],
                  }}
                  validationSchema={editRecordSchema}
                  onSubmit={handleEditRecord}
                >
                  {(props) => (
                    <form onSubmit={props.handleSubmit}>
                      <CustomSelect label="TYPE" name="type" className="select select-warning">
                        <option value="">Select Type to Edit</option>
                        <option value="Attendance">Attendance</option>
                        <option value="Absent">Absent</option>
                      </CustomSelect>
                      <div className="form-control mt-2">
                        <label htmlFor="" className="label">
                          <span className="label-text">DATE</span>
                        </label>
                        <Field className="input input-warning" type="date" name="qDate" />
                      </div>
                      <button type="submit" value="" className="btn btn-warning w-full mt-6">
                        EDIT RECORD
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
export default SubjectBody;
