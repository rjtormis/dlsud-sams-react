import React from "react";
import { Link } from "react-router-dom";

import bg from "../../assets/bg.jpg";

function DashboardClassroomItem({ title, adviser }) {
  return (
    <>
      <div class="card card-compact w-full hover:scale-105 bg-white">
        <figure>
          <img src={bg} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Adviser: {adviser}</p>
          <div className="card-actions justify-end">
            <Link to={title} className="btn text-green-900">
              Visit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardClassroomItem;
