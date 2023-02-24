import { useParams, Link } from "react-router-dom";
import { FaHome, FaUserTie, FaUserGraduate } from "react-icons/fa";

import RegisterStudent from "../components/Register/RegisterStudent";

function Register() {
  const params = useParams();

  const type = params.type;

  return (
    <div className="grid grid-cols-4 h-screen">
      <div id="regBG" className="p-4 col-span-1 flex content-center justify-center ">
        <section className="absolute top-5 left-5 flex flex-col gap-2 ">
          <Link to="/" className="btn btn-neutral mr">
            <FaHome size={20} className="" />
          </Link>
          <Link to={`/register/${type === "student" ? "professor" : "student"}`} className="btn btn-neutral">
            {type === "student" ? (
              <FaUserGraduate size={20} color={"#224429"} />
            ) : (
              <FaUserTie size={20} color={"#224429"} />
            )}
          </Link>
        </section>
      </div>

      <div className="col-span-3 bg-white p-4 flex flex-col justify-center relative">
        <section id="regInput" className="p-20">
          <h2 className="text-green-700 text-4xl">CREATE A {type === "student" ? "STUDENT" : "PROFESSOR"} ACCOUNT</h2>
          <p className="mt-2">Never Miss a Beat: Keep Track of Attendance with Ease</p>

          {type === "student" ? <RegisterStudent type={type} /> : ""}

          <p className="mt-10 text-center">
            Already have an account?
            <Link to="/login" className="ml-4 link link-primary">
              Login!
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
export default Register;
