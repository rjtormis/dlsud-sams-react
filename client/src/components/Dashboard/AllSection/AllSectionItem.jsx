import React from "react";
import { Link } from "react-router-dom";
import { aws_section_url } from "../../../utilities/Helper";

function AllSectionItem({ title, adviser, image_link }) {
  /**
   * AllSectionItem
   *  Consider this as a List Item (<li> tag).
   *  The main purpose of this component is it acts as the container for all of the objects inside the sections array.
   *
   */
  return (
    <>
      <div className="card card-compact glass w-full bg-white hover:cursor-pointer hover:scale-105  hover:bg-green-800 hover:text-white">
        <figure className="h-32">
          <img
            src={aws_section_url + image_link}
            alt="section"
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className="text-sm font-bold">Adviser: {adviser}</p>
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

export default AllSectionItem;
