import { Link } from "react-router-dom";
import RegisterStudent from "../Register/RegisterStudent";
import RegisterProfessor from "../Register/RegisterProfessor";

function RegisterBody({ type }) {
  const user_type = type === "student" ? <RegisterStudent /> : <RegisterProfessor />;
  return (
    <section id="regInput" className="p-0 relative top-0 left-0 xl:px-20">
      <h1 className="text-green-700  mt-4 text-3xl text-center sm:text-center md:text-center xl:text-start">
        CREATE A {type === "student" ? "STUDENT" : "PROFESSOR"} ACCOUNT
      </h1>

      <p className="mt-2 text-center xl:text-start">
        Never Miss a Beat: Keep Track of Attendance with Ease
      </p>

      {user_type}

      <p className="mt-4 text-center">
        Already have an account?
        <Link to="/login" className="ml-4 link link-primary">
          Login!
        </Link>
      </p>
    </section>
  );
}
export default RegisterBody;
