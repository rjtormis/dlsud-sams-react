import { Link } from "react-router-dom";
import { FaHome, FaUserTie, FaUserGraduate } from "react-icons/fa";

function RegisterHeader({ type }) {
  return (
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
  );
}
export default RegisterHeader;
