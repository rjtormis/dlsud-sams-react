import { useEffect, useState } from "react";
import { FcReading, FcSms, FcGraduationCap } from "react-icons/fc";

import BeatLoader from "react-spinners/BeatLoader";

// Hooks
import useFetch from "../../../hooks/useFetch";
import { useAuth } from "../../../context/AuthContext";

function MainTotal() {
  const { auth } = useAuth();
  const { data, loading } = useFetch(
    "https://dlsud-sams-react-production.up.railway.app/api/v1/dashboard",
    "total",
    auth
  );
  console.log(auth);
  const [students, setStudents] = useState(0);
  const [lectures, setLectures] = useState(0);
  const [classrooms, setClassrooms] = useState(0);

  useEffect(() => {
    if (data !== null) {
      setStudents(data.students);
      setLectures(data.lectures);
      setClassrooms(data.classrooms);
    }
  }, [data]);
  return (
    <>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="stat shadow  rounded-lg bg-white hover:scale-105">
          <div className="stat-figure">
            <FcSms size={40} />
          </div>
          <div className="stat-title text-primary">TOTAL SECTIONS</div>
          <div className="stat-value">{loading ? <BeatLoader color="#436147" /> : classrooms}</div>
          <div className="stat-desc">Total sections registered in the system.</div>
        </div>
        <div className="stat shadow  rounded-lg bg-white hover:scale-105">
          <div className="stat-figure">
            <FcGraduationCap size={40} />
          </div>
          <div className="stat-title text-primary">TOTAL STUDENTS</div>
          <div className="stat-value ">{loading ? <BeatLoader color="#436147" /> : students}</div>
          <div className="stat-desc">Total students registered in the system.</div>
        </div>
        <div className="stat shadow  rounded-lg bg-white hover:scale-105">
          <div className="stat-figure">
            <FcReading size={40} />
          </div>
          <div className="stat-title text-primary">TOTAL LECTURES CONDUCTED</div>
          <div className="stat-value">{loading ? <BeatLoader color="#436147" /> : lectures}</div>
          <div className="stat-desc">Total lectures you have conducted.</div>
        </div>
      </div>
    </>
  );
}

export default MainTotal;
