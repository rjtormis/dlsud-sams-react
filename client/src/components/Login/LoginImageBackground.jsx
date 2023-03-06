import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import bg from "../../assets/bg.jpg";

function LoginImageBackground() {
  return (
    <>
      <div className="hidden col-span-1 relative md:block xl:col-span-2">
        <Link to="/" className="absolute btn bg-white top-5 left-5">
          <FaHome size={20} color={"#224429"} />
        </Link>
        <figure className="h-full">
          <img src={bg} alt="Background" className="w-full h-full" />
        </figure>
      </div>
    </>
  );
}

export default LoginImageBackground;
