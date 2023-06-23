import axios from "axios";
import { Helmet } from "react-helmet";
import { Formik } from "formik";
import { HiUserGroup } from "react-icons/hi";
import { ImBook } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { MdQueryStats, MdError } from "react-icons/md";
import { AiOutlinePlus, AiOutlineCheckCircle } from "react-icons/ai";
import HashLoader from "react-spinners/HashLoader";
// Context
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
// Components
import Loader from "../../components/Shared/Loader";
import Alert from "../../components/Shared/Alert";
if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}

function SMain() {
  const { auth } = useAuth();
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const fName = auth.name.split(" ")[0];
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        setSuccessMsg("");
      }, 5000);
    }
    if (error) {
      setTimeout(() => {
        setError(false);
        setErrorMsg("");
      }, 5000);
    }
  }, [success, error]);

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const response = await axios.get("/api/v1/studentdashboard", {
          headers: {
            Authorization: `Bearer ${auth.access_token}`,
          },
        });
        setTotalStudent(response.data.total_students);
        setTotalSubjects(response.data.total_subjects);
        setTotalAttendance(response.data.total_lectures_attended);
        setTotalPercentage(response.data.total_percentage);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetch();
  }, [auth]);

  const handleSubmit = async (state, action) => {
    try {
      const response = await axios.post(
        "/api/v1/students/enroll",
        { code: state.courseCode },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.access_token}`,
          },
        }
      );
      setSuccess(true);
      setSuccessMsg(response.data.message);
      setError(false);
      setErrorMsg(false);
    } catch (e) {
      const { message } = e.response.data;
      setSuccess(false);
      setSuccessMsg("");
      setError(true);
      setErrorMsg(message);
    }
  };

  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | STUDENTS DASHBOARD</title>
      </Helmet>
      <main className="ml-[100px] mr-[60px] mt-5 bg-[#fbfbfb] h-full flex flex-col">
        {loading ? (
          <Loader
            style_div="text-center m-auto"
            type={<HashLoader color="#436147" className="mx-auto" />}
          />
        ) : (
          <>
            <header>
              <h1 className="text-4xl text-secondary">Welcome back, {fName}!</h1>
              <p className="text-[14px]">{date.toLocaleString("en-PH", options)}</p>
            </header>
            {error ? <Alert custom="alert-error mt-2" icon={<MdError />} msg={errorMsg} /> : ""}
            {success ? (
              <Alert custom="alert-success mt-2" icon={<AiOutlineCheckCircle />} msg={successMsg} />
            ) : (
              ""
            )}

            <section className="mt-4">
              <header className="flex justify-between mb-4">
                <h2 className="text-xl text-secondary my-auto">Insights</h2>
                <div className="form-control justify-end">
                  <label className="label">
                    <span className="label-text">Enroll subject</span>
                  </label>
                  <Formik initialValues={{ courseCode: "" }} onSubmit={handleSubmit}>
                    {(props) => (
                      <form onSubmit={props.handleSubmit}>
                        <div className="input-group ">
                          <input
                            type="text"
                            name="courseCode"
                            placeholder="Enroll subject"
                            onChange={props.handleChange}
                            className="input input-sm input-secondary focus:outline-none"
                          />
                          <button type="submit" className="btn btn-secondary btn-sm">
                            <AiOutlinePlus />
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </header>
              <div className="grid grid-cols-4 gap-4">
                <section className="sd-card p-6 hover:bg-secondary">
                  <div className=" flex justify-center p-6">
                    <div className="bg-secondary p-4 rounded-md">
                      <HiUserGroup size={50} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl text-center">Total Students</h2>
                  <p className="text-3xl text-center font-[900]">{totalStudent}</p>
                </section>

                <section className="sd-card p-6 hover:bg-secondary">
                  <div className=" flex justify-center p-6">
                    <div className="bg-secondary p-4 rounded-md">
                      <ImBook size={50} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl text-center">{fName}'s Subjects</h2>
                  <p className="text-3xl text-center font-[900]">{totalSubjects}</p>
                </section>

                <section className="sd-card p-6 hover:bg-secondary">
                  <div className=" flex justify-center p-6">
                    <div className="bg-secondary p-4 rounded-md">
                      <GiTeacher size={50} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl text-center">Total Lectures attended</h2>
                  <p className="text-3xl text-center font-[900]">{totalAttendance}</p>
                </section>

                <section className="sd-card p-6 hover:bg-secondary">
                  <div className=" flex justify-center p-6">
                    <div className="bg-secondary p-4 rounded-md">
                      <MdQueryStats size={50} className="text-white" />
                    </div>
                  </div>
                  <h2 className="text-2xl text-center">Attendance of {fName}</h2>
                  <p className="text-3xl text-center font-[900]">{totalPercentage}%</p>
                </section>
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
export default SMain;
