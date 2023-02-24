import { Link } from "react-router-dom";
import { Formik } from "formik";
import { FaEnvelope, FaShieldAlt, FaHome } from "react-icons/fa";
import logo from "../assets/dlsu-d.png";
import bg from "../assets/bg.jpg";
import { loginSchema } from "../schemas/LoginSchema";

import CustomInput from "../components/Shared/CustomInput";

function Login() {
  const handleSubmit = (state, action) => {
    console.log(state);
    console.log(action);
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 relative">
        <Link to="/" className="absolute btn bg-white top-5 left-5">
          <FaHome size={20} color={"#224429"} />
        </Link>
        <figure className="h-full">
          <img src={bg} alt="Background" className="w-full h-full" />
        </figure>
      </div>

      <div id="register" className="bg-white p-4 flex flex-col">
        <section id="regLogo" className="flex justify-center">
          <img src={logo} alt="DLSUD SAMS" />
        </section>

        <section id="regInput" className="my-auto mx-10 ">
          <h2 className="text-green-700 text-4xl">Welcome back</h2>
          <p>Welcome back! Please enter your details</p>

          <Formik initialValues={{ email: "", password: "" }} validationSchema={loginSchema} onSubmit={handleSubmit}>
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
                <input type="submit" value="LOGIN" className="btn btn-primary w-full mt-4" />
              </form>
            )}
          </Formik>

          <p className="mt-10 text-center">
            Don't Have an account?
            <Link to="/register/student" className="ml-4 link link-primary">
              Sign Up!
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
export default Login;
