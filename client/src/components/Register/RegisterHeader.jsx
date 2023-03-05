import { Link } from "react-router-dom";
import { FaHome, FaUserTie, FaUserGraduate } from "react-icons/fa";

function RegisterHeader({ type }) {
  const opposite_type = type === "student" ? "professor" : "student";
  const opposite_icon =
    type === "student" ? (
      <FaUserTie color="#224429" size={25} />
    ) : (
      <FaUserGraduate color="#224429" size={25} />
    );

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
        data-tip={`Register as ${opposite_type}`}
      >
        <Link to={`/register/${opposite_type}`} className="link link-primary xl:hidden">
          {type === "student" ? `As ${opposite_type}` : `As ${opposite_type}`}
        </Link>

        <Link to={`/register/${opposite_type}`} className="hidden xl:btn btn-ghost">
          {opposite_icon}
        </Link>
      </div>
    </div>
  );
}
export default RegisterHeader;
