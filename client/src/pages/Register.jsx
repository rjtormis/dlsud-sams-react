import { useParams, Link } from "react-router-dom";
import { FaHome, FaUserTie, FaUserGraduate } from "react-icons/fa";
import { useState } from "react";

import RegisterStudent from "../components/Register/RegisterStudent";
import RegisterProfessor from "../components/Register/RegisterProfessor";
import Alert from "../components/Shared/Alert";

function Register() {
  const params = useParams();

  const [success, setSuccess] = useState(false);

  const handleSuccess = (checker) => {
    setSuccess(checker);
  };

  if (success) {
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  }
  const type = params.type;

  return (
    <div className="grid grid-cols-4 h-screen">
      <div id="regBG" className="p-4 col-span-1 flex content-center justify-center "></div>
      <div className="col-span-3 bg-white p-20 flex flex-col justify-center relative">
        <div className="flex flex-col absolute top-3 right-3">
          <div className="tooltip tooltip-neutral tooltip-left" data-tip="Home">
            <Link to="/" className="btn btn-ghost">
              <FaHome color="#224429" size={18} />
            </Link>
          </div>
          <div
            className="mt-2 tooltip tooltip-neutral tooltip-left"
            data-tip={`Register as ${type === "student" ? "professor" : "student"} `}
          >
            <Link
              to={`/register/${type === "student" ? "professor" : "student"}`}
              className="btn btn-ghost "
            >
              {type === "student" ? (
                <FaUserGraduate color="#224429" />
              ) : (
                <FaUserTie color="#224429" />
              )}
            </Link>
          </div>
        </div>

        {/* RESTRUCTURE LATER */}
        {success ? <Alert /> : null}

        <section id="regInput" className="p-0">
          <h2 className="text-green-700 text-4xl mt-4">
            CREATE A {type === "student" ? "STUDENT" : "PROFESSOR"} ACCOUNT
          </h2>

          <p className="mt-2">Never Miss a Beat: Keep Track of Attendance with Ease</p>

          {type === "student" ? (
            <RegisterStudent handleSuccess={handleSuccess} />
          ) : (
            <RegisterProfessor handleSuccess={handleSuccess} />
          )}

          <p className="mt-4 text-center">
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
