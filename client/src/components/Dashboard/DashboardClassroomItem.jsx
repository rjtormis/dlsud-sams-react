import React from "react";

import bg from "../../assets/bg.jpg";

function DashboardClassroomItem({ title, adviser }) {
  return (
    <>
      <div class="card w-full glass shadow-md shadow-black">
        <figure>
          <img src={bg} alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{title}</h2>
          <p>Adviser: {adviser}</p>
          <div class="card-actions justify-end">
            <button class="btn ">Visit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardClassroomItem;
