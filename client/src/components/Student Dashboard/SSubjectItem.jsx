import { Link, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

// Context
import { useStudentDashboardContext } from "../../context/StudentDashboardContext";
function SSubjectItem({ subject }) {
  const { setSub } = useStudentDashboardContext();

  return (
    <div id="subject" className="card card-compact w-full  shadow-xl text-white">
      <div className="card-body flex">
        <h2 className="card-title">
          <p>{subject.subject_name}</p> <p className="text-end">{subject.section}</p>
        </h2>
        <p>Professor: {subject.handled_by}</p>
        <p>
          Schedule: {subject.schedule.start} TO {subject.schedule.start} {subject.schedule.day}
        </p>
        <div className="card-actions justify-end">
          <Link
            to={`/student-dashboard/subjects/${subject.subject_name}`}
            className="btn btn-white btn-square btn-xs"
            onClick={() => setSub(subject)}
          >
            <MdOutlineKeyboardArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
export default SSubjectItem;
