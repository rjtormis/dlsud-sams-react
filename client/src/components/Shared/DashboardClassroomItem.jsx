import React from "react";
import { Link } from "react-router-dom";

function DashboardClassroomItem({ title, adviser, image_link }) {
  return (
    <>
      <div className="card card-compact glass w-full hover:scale-105 bg-white hover:bg-green-800 hover:text-white">
        <figure>
          <img
            src={"https://aws-sams-storage.s3.ap-southeast-1.amazonaws.com" + image_link}
            alt="Shoes"
          />
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
