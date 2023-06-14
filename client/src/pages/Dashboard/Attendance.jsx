import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import HashLoader from "react-spinners/HashLoader";

// Context
import { useSpecificSection } from "../../context/SpecificSectionContext";
import { useAuth } from "../../context/AuthContext";

// Components
import Alert from "../../components/Shared/Alert";
import Loader from "../../components/Shared/Loader";

//Utils
import { getCurrentDate } from "../../utilities/Helper";
function Attendance() {
  const navigate = useNavigate();
  const [videoLoad, setVideoLoad] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [camera, setCamera] = useState(true);
  const [detected, setDetected] = useState([]);
  const { auth } = useAuth();

  const { subject } = useSpecificSection();

  useEffect(() => {
    let getAttendance;
    if (videoLoad && camera) {
      getAttendance = setInterval(async () => {
        const response = await axios.get("/api/v1/detected_faces");
        setDetected(response.data.faces);
      }, 5000);
    }
    return () => {
      clearInterval(getAttendance);
    };
  }, [videoLoad, camera]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 10000);
    }
  }, [success]);

  const handleSubmit = async () => {
    try {
      setSubmit(true);

      const response = await axios.post("/api/v1/record", {
        detected: detected,
        id: auth.id,
        sub_code: subject.code,
        date: getCurrentDate("attendance").split(" ")[0],
        time: getCurrentDate("attendance").split(" ")[1],
      });
      setSuccess(true);
      setSubmit(false);
    } catch (e) {
      console.log(e);
      setSubmit(false);
    }
  };
  const handleCancel = async () => {
    setCamera(false);
    await axios.get("/api/v1/video_feed", {
      params: { disable_camera: "true" },
    });
    navigate(`/dashboard/sections/${subject.section}/${subject.subject_name}`);
  };
  return (
    <div className="">
      <div className="text-sm breadcrumbs mb-4">
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
      {success ? (
        <Alert
          icon={<AiOutlineCheckCircle />}
          msg="Attendance recorded"
          custom="alert-success mb-4"
        />
      ) : (
        ""
      )}
      {!videoLoad ? (
        <Loader
          type={<HashLoader className="mx-auto" color="#436147" />}
          style_div="text-center h-full"
        />
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="my-auto">
          <img
            className="rounded-xl"
            src={`${camera ? "/api/v1/video_feed" : ""}`}
            alt="Video Feed"
            onLoad={() => setVideoLoad(true)}
          />
        </div>
        {!videoLoad ? (
          ""
        ) : (
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
              <button
                className={`btn btn-primary mr-4 ${detected.length > 0 ? "" : "btn-disabled"} ${
                  submit ? "btn-square loading" : ""
                } ${!camera ? "hidden" : ""}`}
                onClick={handleSubmit}
              >
                {submit ? "" : "Record"}
              </button>
              <button
                className={`btn btn-error  ${!camera ? "btn-square loading" : ""} ${
                  submit ? "hidden" : ""
                }`}
                onClick={handleCancel}
              >
                {!camera ? "" : "Cancel"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Attendance;
