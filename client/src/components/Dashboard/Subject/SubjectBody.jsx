import axios from "axios";
import { AiFillCheckCircle, AiOutlineDownload, AiTwotoneTrophy } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

// Context
import { useSpecificSection } from "../../../context/SpecificSectionContext";
import { useAuth } from "../../../context/AuthContext";
// Components
import Modal from "../../Shared/Modal";
import SubjectStudentsTable from "./SubjectStudentsTable";
import SubjectLeaderboardTable from "./SubjectLeaderboardTable";
import { useEffect, useMemo } from "react";

function SubjectBody() {
  const { subject, studentToRemove, subjectToRemove, search, setSearch, setResult, setFetchData } =
    useSpecificSection();
  const { auth } = useAuth();

  const attendanceData = [
    { name: "John Doe", id: "12345", attendance: 12 },
    { name: "Jane Smith", id: "67890", attendance: 15 },
    { name: "Bob Johnson", id: "24680", attendance: 10 },
  ];
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
      const response = await axios.delete(
        `/api/v1/subjects/${subjectToRemove}/${studentToRemove}/enrolled`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": auth.csrf_access_token,
          },
        }
      );
      const test = subject.enrolled.filter((student) => student.studentNo !== studentToRemove);
      subject.enrolled = test;
    } catch (e) {
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
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex justify-between mb-2">
            <div>
              <h1 className="text-2xl text-primary">STUDENTS ENROLLED</h1>
              <h1 className="text-xs">COURSE CODE: {subject.code}</h1>
            </div>
            <div className="mr-2">
              <div className="flex m-auto justify-end">
                <div className="tooltip tooltip-primary mr-2" data-tip="Start attendance">
                  <button>
                    <AiFillCheckCircle size={20} />
                  </button>
                </div>
                <div className="tooltip tooltip-primary mr-2" data-tip="Download attendance">
                  <button onClick={downloadCSV}>
                    <AiOutlineDownload size={20} />
                  </button>
                </div>
                <div className="tooltip tooltip-primary mr-2" data-tip="Refresh">
                  <button onClick={() => setFetchData(true)}>
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
          <div className=" overflow-y-auto h-[520px]">
            <SubjectStudentsTable />
          </div>
        </div>
        <div className="col-span-1">
          <header>
            <h1 className="text-2xl flex">
              LEADERBOARD
              <span className="ml-4">
                <AiTwotoneTrophy className="" />
              </span>
            </h1>
          </header>
          <div className="h-[510px] overflow-y-auto">
            <SubjectLeaderboardTable />
          </div>
        </div>
      </div>

      <Modal id="remove_student">
        <div className="flex">
          <AiFillDelete size={20} className="my -auto mr-4" color="#E94951" />
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
    </div>
  );
}
export default SubjectBody;
