import { useParams, Link } from "react-router-dom";
import { FaHome, FaUserTie, FaUserGraduate } from "react-icons/fa";
import { useState } from "react";

import logo from "../assets/dlsu-d.png";

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
    <div className="grid grid-cols-1 h-screen lg:grid-cols-3 xl:grid-cols-4">
      <div id="regBG" className="hidden lg:block col-span-1 xl:col-span-1 "></div>
      <div className="col-span-1 bg-white flex flex-col justify-center relative lg:col-span-2 p-8 xl:col-span-3">
        <div className="xl:absolute top-5 left-15 ">
          <img src={logo} className="w-48 m-auto sm:w-60" alt="" />
        </div>

        <div className="text-center xl:absolute top-3 right-3">
          <div className="mr-2 tooltip tooltip-neutral tooltip-left" data-tip="Home">
            <Link to="/" className="link link-primary xl:hidden">
              Home
            </Link>
            <Link to="/" className="hidden xl:btn btn-ghost">
              <FaHome color="#224429" size={25} />
            </Link>
          </div>
          <div
            className="ml-2 tooltip tooltip-neutral tooltip-left"
            data-tip={`Register as ${type === "student" ? "professor" : "student"} `}
          >
            <Link
              to={`/register/${type === "student" ? "professor" : "student"}`}
              className="link link-primary xl:hidden"
            >
              {type === "student"
                ? // <FaUserGraduate color="#224429" size={25} />
                  `As ${type === "student" ? "professor" : "student"}`
                : // <FaUserTie color="#224429" size={25} />
                  `As ${type === "student" ? "professor" : "student"}`}
            </Link>

            <Link
              to={`/register/${type === "student" ? "professor" : "student"}`}
              className="hidden xl:btn btn-ghost"
            >
              {type === "student" ? (
                <FaUserGraduate color="#224429" size={25} />
              ) : (
                <FaUserTie color="#224429" size={25} />
              )}
            </Link>
          </div>
        </div>
        {/* RESTRUCTURE LATER */}
        {success ? <Alert custom={"mt-4"} /> : null}

        <section id="regInput" className="p-0 relative top-0 left-0 xl:px-20">
          <h1 className="text-green-700  mt-4 text-3xl text-center sm:text-center md:text-center xl:text-start">
            CREATE A {type === "student" ? "STUDENT" : "PROFESSOR"} ACCOUNT
          </h1>

          <p className="mt-2 text-center xl:text-start">
            Never Miss a Beat: Keep Track of Attendance with Ease
          </p>

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
