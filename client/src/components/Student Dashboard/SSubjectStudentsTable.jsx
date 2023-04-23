import { FiEdit2 } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { useStudentDashboardContext } from "../../context/StudentDashboardContext";
import { aws_user_url } from "../../utilities/Helper";
function SSubjectStudentsTable() {
  const { sub, result, search } = useStudentDashboardContext();
  const { enrolled } = sub;
  return (
    <table className="table w-full z-10">
      <thead className="relative z-10">
        <tr className="sticky top-0">
          <th className="z-10 text-center bg-secondary text-white">Name</th>
          <th className="z-10 text-center bg-secondary text-white">Email</th>
          <th className="z-10 text-center bg-secondary text-white">Student ID</th>
          <th className="z-10 text-center bg-secondary text-white">Total Attendance</th>
        </tr>
      </thead>

      <tbody>
        {search === "" ? (
          enrolled.map((student) => (
            <tr className="" key={student.studentNo}>
              <td className="z-10">
                <div className="flex items-center space-x-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img className="" src={aws_user_url + student.profile} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-sm">{student.name}</div>
                  </div>
                </div>
              </td>
              <td className="text-center text-sm">{student.emailAddress}</td>
              <td className="text-center text-sm">{student.studentNo}</td>
              <td className="text-center text-sm">{student.total_attendance}</td>
            </tr>
          ))
        ) : result !== undefined ? (
          <tr className="" key={result.studentNo}>
            <td className="z-10">
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
            <td className="text-center text-sm">{result.emailAddress}</td>
            <td className="text-center text-sm">{result.studentNo}</td>
            <td className="text-center text-sm">{result.total_attendance}</td>
          </tr>
        ) : (
          ""
        )}
      </tbody>
    </table>
  );
}
export default SSubjectStudentsTable;
