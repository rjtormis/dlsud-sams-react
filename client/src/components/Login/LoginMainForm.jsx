import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaShieldAlt } from "react-icons/fa";
import { Formik } from "formik";

// Schemas
import { loginSchema } from "../../schemas/LoginSchema";

// Components
import CustomInput from "../Shared/CustomInput";

// Context
import { useAuth } from "../../context/AuthContext";

// Assets
import logo from "../../assets/dlsu-d.png";
import ClipLoader from "react-spinners/ClipLoader";
import { getCookie } from "../../utilities/getCookie";

// Actions
import { loginAuthorization } from "../../actions/Auth";

function LoginMainForm() {
  const { setAuth, loading, setLoading } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (state, action) => {
    setLoading(true);
    try {
      const {
        data: {
          user: { id, type, name, profile_image },
          access_token,
          refresh_token,
        },
      } = await loginAuthorization(state);
      setAuth({
        id: id,
        type: type,
        name: name,
        access_token: access_token,
        refresh_token: refresh_token,
        profile_image: profile_image,
      });
      setLoading(false);
      if (type === "professor") navigate("/dashboard");
      if (type === "student") navigate("/student-dashboard");
    } catch (e) {
      const { message, status } = e.response.data;
      if (e.message === "Network Error") {
        setLoading(false);
        action.setFieldError("email", "An error occured. Please try again.");
        action.setFieldError("password", "‎");
      }

      if (status === 404) {
        setLoading(false);
        action.setFieldError("email", message);
        action.setFieldError("password", "‎");
      }
      if (e.response.status === 500) {
        // TODO
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div id="register" className="bg-white p-2 flex flex-col xl:col-span-1">
        <section id="regLogo" className="w-full">
          <img src={logo} alt="DLSUD SAMS" className="w-52 m-auto sm:w-60 xl:w-64" />
        </section>

        <section id="regInput" className="my-auto mx-5 flex flex-col sm:block ">
          <h2 className="text-green-700 text-3xl text-center sm:text-4xl ">Welcome back</h2>
          <p className="text-center ">Welcome back! Please enter your details</p>

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
                <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
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
    </>
  );
}

export default LoginMainForm;
