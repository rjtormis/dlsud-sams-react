import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";

import axios from "axios";

// Context
import { useSpecificSection } from "../../context/SpecificSectionContext";

import Alert from "../../components/Shared/Alert";

function Attendance() {
  const [videoLoad, setVideoLoad] = useState(false);
  const [detected, setDetected] = useState([]);

  const { subject } = useSpecificSection();

  useEffect(() => {
    if (videoLoad) {
      setInterval(async () => {
        const response = await axios.get("/api/v1/detected_faces");
        setDetected(response.data.faces);
      }, 3000);
    }
  }, [videoLoad]);

  return (
    <div>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/dashboard/sections" className=" text-green-800">
              Sections
            </Link>
          </li>
          <li>
            <Link to={`/dashboard/sections/${subject.section}`} className=" text-green-800">
              {subject.section}
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/sections${subject.section}/${subject.subject_name}`}
              className=" text-green-800"
            >
              {subject.subject_name}
            </Link>
          </li>
          <li>
            <p className=" text-green-800">Record Attendance</p>
          </li>
        </ul>
      </div>
      <Alert
        icon={<AiOutlineCheckCircle />}
        msg="Attendance recorded"
        custom="alert-success mb-4"
      />

      {!videoLoad ? <h1>Loading...</h1> : ""}
      <div className="grid grid-cols-2 gap-4">
        <div className="">
          <img
            className="rounded-xl"
            src="/api/v1/video_feed"
            alt="Video Feed"
            onLoad={() => setVideoLoad(true)}
          />
        </div>
        <div className="relative">
          <h1 className="text-green-800 text-2xl">
            {subject.section}-{subject.subject_name}
          </h1>
          <p className="text-[12px] mb-[10px]">
            Record attendance for {subject.section}-{subject.subject_name}
          </p>
          <h2 className="text-md font-bold mb-[10px]">Detected Students</h2>
          {detected.length > 0 ? (
            <ul>
              {detected.map((face) => (
                <li key={face}>{face}</li>
              ))}
            </ul>
          ) : (
            ""
          )}
          <div className="absolute bottom-0 right-0">
            <button className="btn btn-primary mr-4">Record</button>
            <button className="btn btn-error ">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Attendance;
