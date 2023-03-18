import { Formik } from "formik";
import { useState } from "react";

// Components
import CustomInput from "../Shared/CustomInput";
import CustomSelect from "../Shared/CustomSelect";
import CustomInputGroup from "../Shared/CustomInputGroup";

import Button from "../Shared/Button";
import spinner from "../../assets/spinner.gif";

// Icons
import { FaEnvelope, FaCalendar } from "react-icons/fa";
import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

// Schema
import { registerProfessorSchema } from "../../schemas/RegisterSchema";

// Actions
import { professorAccountCreation } from "../../actions/Register";

function RegisterProfessor({ success }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state, action) => {
    try {
      setLoading(true);
      const createProfessorAccount = await professorAccountCreation(state);
      if (createProfessorAccount.status === 201) {
        setTimeout(() => {
          success(true);
          setLoading(false);
          action.resetForm();
        }, 500);
      }
    } catch (e) {
      setLoading(false);
      if (e.response.data["msg"] === "Email already taken.") {
        action.setFieldError("emailAddress", "Email already exists.");
      }
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          middleInitial: "",
          lastName: "",
          collegiate: "",
          birthDate: "",
          emailAddress: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerProfessorSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form className="mt-10" onSubmit={props.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CustomInput
                label="First name"
                page="register"
                type="text"
                placeholder="First name"
                name="firstName"
              />
              <CustomInput
                label="Middle Initial"
                page="register"
                type="text"
                placeholder="Middle Initial"
                name="middleInitial"
                maxLength={1}
              />
              <CustomInput
                label="Last name"
                page="register"
                type="text"
                placeholder="Last name"
                name="lastName"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CustomSelect label="Collegiate" page="register" name="collegiate">
                <option value="">Select Colleigate</option>
                <option value="CBAA">CBAA</option>
                <option value="CCJE">CCJE</option>
                <option value="CE">CE</option>
                <option value="CEAT">CEAT</option>
                <option value="CLAC">CLAC</option>
                <option value="CSCS">CSCS</option>
                <option value="CTHM">CTHM</option>
              </CustomSelect>
              <CustomInputGroup
                label="Birth date"
                page="register"
                icon={<FaCalendar />}
                type="date"
                name="birthDate"
              />
              <CustomInputGroup
                label="Email"
                page="register"
                icon={<FaEnvelope />}
                type="email"
                placeholder="Email"
                name="emailAddress"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CustomInputGroup
                label="Password"
                page="register"
                icon={<BsFillShieldLockFill />}
                placeholder="Password"
                type="password"
                name="password"
              />
              <CustomInputGroup
                label="Confirm Password"
                page="register"
                icon={<BsShieldFillExclamation />}
                placeholder="Password"
                type="password"
                name="confirmPassword"
              />
            </div>
            <Button
              styles={`btn-primary w-full mt-4 ${
                loading ? "disabled:opacity-75 disabled:btn-primary" : ""
              }`}
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <img src={spinner} alt="" className="w-5 h-5 mr-2" />
                  <p>CREATING ACCOUNT ...</p>
                </>
              ) : (
                "CREATE ACCOUNT"
              )}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default RegisterProfessor;
