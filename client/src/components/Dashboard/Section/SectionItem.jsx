import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { MdDelete, MdEdit, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSpecificSection } from "../../../context/SpecificSectionContext";
function SectionItem({ subject, isProfessor }) {
  const { setIsModalOpen, dispatch, setSubjectName } = useSpecificSection();
  const onVisit = () => {
    dispatch({ type: "SET_SUBJECT", payload: { ...subject } });
  };
  const onEdit = () => {
    let { schedule, ...data } = subject;

    dispatch({
      type: "SET_EDIT_SUBJECT",
      payload: {
        ...data,
        schedule: {
          start: schedule.start.split(" ")[0],
          end: schedule.end.split(" ")[0],
          day: schedule.day,
        },
      },
    });
    setIsModalOpen(true);
  };
  const onDelete = () => {
    setSubjectName(subject.subject_name);
    setIsModalOpen(true);
  };

  return (
    <div id="subject" className="card card-compact w-full  shadow-xl text-white">
      <div className="card-body flex">
        <h2 className="card-title">{subject.subject_name}</h2>
        <p>Professor: {subject.handled_by}</p>
        <p>
          Schedule: {subject.schedule.start} TO {subject.schedule.end} {subject.schedule.day}
        </p>
        <div className="card-actions justify-end">
          <Link
            onClick={onVisit}
            to={`/dashboard/sections/${subject.subject_name}/test`}
            className="btn btn-white btn-square btn-xs"
          >
            <MdOutlineKeyboardArrowRight size={16} />
          </Link>
          {isProfessor ? (
            <>
              <a onClick={onEdit} href="#edit_subject" className="btn btn-white btn-square btn-xs">
                <MdEdit size={16} />
              </a>
              <a
                onClick={onDelete}
                href="#delete_subject"
                className="btn btn-white btn-square btn-xs"
              >
                <MdDelete size={16} />
              </a>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SectionItem;
