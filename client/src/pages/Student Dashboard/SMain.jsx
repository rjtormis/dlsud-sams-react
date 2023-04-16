import axios from "axios";
import { Formik } from "formik";
import { HiUserGroup } from "react-icons/hi";
import { ImBook } from "react-icons/im";
import { GiTeacher } from "react-icons/gi";
import { MdQueryStats } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";

// Context
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useState } from "react";

function SMain() {
  const { auth } = useAuth();
  const [totalStudent, setTotalStudent] = useState(0);
  const [totalSubjects, setTotalSubjects] = useState(0);
  const [loading, setLoading] = useState(false);
  const fName = auth.name.split(" ")[0];
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    setLoading(true);
    const fetch = async () => {
      try {
        const response = await axios.get("/api/v1/studentdashboard");
        setTotalStudent(response.data.total_students);
        setTotalSubjects(response.data.total_subjects);
        setLoading(false);
      } catch (e) {
        console.log(e);
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleSubmit = async (state, action) => {
    const response = await axios.post(
      "/api/v1/students/enroll",
      { code: state.courseCode },
      { headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token } }
    );
    console.log(response);
  };

  return (
    <>
      {loading ? (
        <h1>Loading..</h1>
      ) : (
        <main className="ml-[100px] mr-[60px] mt-5 bg-[#fbfbfb]">
          <header>
            <h1 className="text-4xl text-secondary">Welcome back, {fName}!</h1>
            <p className="text-[14px]">{date.toLocaleString("en-PH", options)}</p>
          </header>

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
                ;
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
                <p className="text-3xl text-center font-[900]">10</p>
              </section>

              <section className="sd-card p-6 hover:bg-secondary">
                <div className=" flex justify-center p-6">
                  <div className="bg-secondary p-4 rounded-md">
                    <MdQueryStats size={50} className="text-white" />
                  </div>
                </div>
                <h2 className="text-2xl text-center">Attendance of Juan</h2>
                <p className="text-3xl text-center font-[900]">69%</p>
              </section>
            </div>
          </section>
        </main>
      )}
    </>
  );
}
export default SMain;
