import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { Formik } from "formik";
import { FaEnvelope, FaShieldAlt, FaHome } from "react-icons/fa";
import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios";
import logo from "../assets/dlsu-d.png";
import bg from "../assets/bg.jpg";

// Schmeas
import { loginSchema } from "../schemas/LoginSchema";

// Components
import CustomInput from "../components/Shared/CustomInput";

// Context
import AuthContext from "../context/AuthContext";

function Login() {
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (state, action) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "/login",
        { ...state },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { id, type, access_token } = response.data;
      setAuth({ id: id, type: type, access_token: access_token });
      setLoading(false);
      navigate("/dashboard");
    } catch (e) {
      if (e.response.status === 404) {
        setLoading(false);
        action.setFieldError("email", "Invalid credentials");
        action.setFieldError("password", "‎");
      }
      if (e.response.status === 500) {
        setLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 h-screen md:grid-cols-2 xl:grid-cols-3">
      <div className="hidden col-span-1 relative md:block xl:col-span-2">
        <Link to="/" className="absolute btn bg-white top-5 left-5">
          <FaHome size={20} color={"#224429"} />
        </Link>
        <figure className="h-full">
          <img src={bg} alt="Background" className="w-full h-full" />
        </figure>
      </div>

      <div id="register" className="bg-white p-2 flex flex-col xl:col-span-1">
        <section id="regLogo" className="w-full">
          <img src={logo} alt="DLSUD SAMS" className="w-52 m-auto sm:w-60 xl:w-64" />
        </section>

        <section id="regInput" className="my-auto mx-5 flex flex-col sm:block ">
          <h2 className="text-green-700 text-3xl text-center sm:text-4xl xl:text-start">
            Welcome back
          </h2>
          <p className="text-center xl:text-start">Welcome back! Please enter your details</p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            {(props) => (
              <form action="" className="mt-10" onSubmit={props.handleSubmit}>
                <CustomInput
                  page="login"
                  label="Email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  icon={<FaEnvelope />}
                />
                <CustomInput
                  page="login"
                  label="Password"
                  type="Password"
                  placeholder="Password"
                  name="password"
                  icon={<FaShieldAlt />}
                />
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-4"
                  disabled={loading ? true : false}
                >
                  {loading ? <ClipLoader color="#436147" /> : "LOGIN"}
                </button>
              </form>
            )}
          </Formik>

          <p className="mt-10 text-center">
            Don't Have an account?{" "}
            <Link to="/register/student" className="hidden ml-2 link link-primary sm:inline-block">
              Sign Up!
            </Link>
          </p>
          <Link to="/register/student" className="link link-primary self-center sm:hidden">
            Sign Up!
          </Link>
        </section>
      </div>
    </div>
  );
}
export default Login;
