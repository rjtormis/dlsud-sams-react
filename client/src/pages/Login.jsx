import { Helmet } from "react-helmet";
import LoginComponent from "../components/Login/LoginComponent";

function Login() {
  return (
    <>
      <Helmet>
        <title>DLSUD SAMS | LOGIN</title>
      </Helmet>
      <LoginComponent />
    </>
  );
}
export default Login;
