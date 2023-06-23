import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import HashLoader from "react-spinners/HashLoader";

// Context
import { useSpecificSection } from "../../context/SpecificSectionContext";
import { useAuth } from "../../context/AuthContext";

// Components
import Alert from "../../components/Shared/Alert";
import Loader from "../../components/Shared/Loader";

//Utils
import { getCurrentDate } from "../../utilities/Helper";
if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}

function Attendance() {
  const navigate = useNavigate();
  const [videoLoad, setVideoLoad] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [camera, setCamera] = useState(true);
  const [detected, setDetected] = useState([]);
  const [time, setTime] = useState([]);
  const { auth, trigger, setTrigger } = useAuth();

  const { subject } = useSpecificSection();

  useEffect(() => {
    let getAttendance;
    if (videoLoad && camera) {
      getAttendance = setInterval(async () => {
        const response = await axios.get("/api/v1/detected_faces", {
          params: { sub_code: subject.code },
          headers: { Authorization: `Bearer ${auth.access_token}` },
        });
        setDetected(response.data.faces);
        setTime(response.data.time);
      }, 5000);
    }
    return () => {
      clearInterval(getAttendance);
    };
  }, [videoLoad, camera, auth, subject]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 15000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
      }, 15000);
    }
  }, [success, error]);

  const handleSubmit = async () => {
    try {
      setSubmit(true);

      const response = await axios.post(
        "/api/v1/record",
        {
          detected: detected,
          id: auth.id,
          sub_code: subject.code,
          date: getCurrentDate("attendance").split(" ")[0],
          time: getCurrentDate("attendance").split(" ")[1],
        },
        { headers: { Authorization: `Bearer ${auth.access_token}` } }
      );
      if (response.data.message) {
        setSuccess(true);
        setError(false);
      }
      if (response.data.error) {
        setSuccess(false);
        setError(true);
      }

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
      headers: { Authorization: `Bearer ${auth.access_token}` },
    });
    navigate(`/dashboard/sections/${subject.section}/${subject.subject_name}`);
  };

  const handleCancelAPI = async () => {
    setTrigger(true);
    if (trigger) {
      setTrigger(false);
      await axios.get("/api/v1/video_feed", {
        params: { disable_camera: "true" },
        headers: { Authorization: `Bearer ${auth.access_token}` },
      });
    }
  };

  return (
    <div className="">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link to="/dashboard/sections" className=" text-green-800" onClick={handleCancelAPI}>
              Sections
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/sections/${subject.section}`}
              className=" text-green-800"
              onClick={handleCancelAPI}
            >
              {subject.section}
            </Link>
          </li>
          <li>
            <Link
              to={`/dashboard/sections/${subject.section}/${subject.subject_name}`}
              className=" text-green-800"
              onClick={handleCancelAPI}
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
      {error ? (
        <Alert
          icon={<BiErrorCircle />}
          msg="There are students who are not enrolled in the current subject."
          custom="alert-error mb-4"
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
            src={
              camera
                ? `https://dlsud-sams-react-production.up.railway.app/api/v1/video_feed?sub_code=${subject.code}`
                : ""
            }
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
            <div className="flex">
              {detected.length > 0 ? (
                <ul>
                  {detected.map((face) => (
                    <li key={face}>{face}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
              {time.length > 0 ? (
                <ul className="ml-4">
                  {time.map((time) => (
                    <li key={time}>{time}</li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
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
