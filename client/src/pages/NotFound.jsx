import { Link } from "react-router-dom";
import { FaHome, FaPen } from "react-icons/fa";
import error from "../assets/404.png";
function NotFound() {
  return (
    <div className="h-screen ">
      <img src={error} alt="" className="m-auto mb-10" />
      <div className="flex justify-center">
        <Link to="/" className="btn btn-primary m-4">
          <FaHome className="mr-3" />
          Home
        </Link>
        <Link to="/register/student" className="btn btn-primary m-4">
          <FaPen className="mr-3" />
          Register
        </Link>
      </div>
    </div>
  );
}
export default NotFound;
