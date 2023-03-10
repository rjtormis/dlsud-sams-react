import { Link } from "react-router-dom";

import { MdDelete, MdEdit, MdOutlineKeyboardArrowRight } from "react-icons/md";
import useSpecificSection from "../../../hooks/useSpecificSection";
import { useEffect } from "react";

function SpecificSectionSubjectItem({ name, professor, schedule, onDelete, onEdit }) {
  return (
    <div id="subject" className="card card-compact w-full  shadow-xl text-white">
      <div className="card-body flex">
        <h2 className="card-title">{name}</h2>
        <p>Professor: {professor}</p>
        <p>Schedule: {schedule}</p>
        <div className="card-actions justify-end">
          <Link to={`/dashboard/sections/${name}/test`} className="btn btn-white btn-square btn-xs">
            <MdOutlineKeyboardArrowRight size={16} />
          </Link>
          <a onClick={onEdit} href="#edit_subject" className="btn btn-white btn-square btn-xs">
            <MdEdit size={16} />
          </a>
          <a onClick={onDelete} href="#delete_subject" className="btn btn-white btn-square btn-xs">
            <MdDelete size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SpecificSectionSubjectItem;
