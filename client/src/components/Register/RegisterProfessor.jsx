import React, { useState, useContext } from "react";
import { Formik } from "formik";
import axios from "axios";

// Icons
import { FaEnvelope, FaCalendar } from "react-icons/fa";
import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

// Components
import CustomInput from "../../components/Shared/CustomInput";
import CustomSelect from "../../components/Shared/CustomSelect";
import spinner from "../../assets/spinner.gif";

// Schema
import { registerProfessorSchema } from "../../schemas/RegisterSchema";

// Context
import CreateContext from "../../context/CreateContext";

function RegisterProfessor() {
  const { setSuccess } = useContext(CreateContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state, action) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/users",
        { ...state, type: "professor" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setTimeout(() => {
          setSuccess(true);
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
          <form action="" className="mt-10" onSubmit={props.handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CustomInput
                page="register"
                label="First name"
                name="firstName"
                type="text"
                placeholder="First name"
              />
              <CustomInput
                page="register"
                label="Middle Initial"
                name="middleInitial"
                type="text"
                placeholder="Middle Initial"
              />
              <CustomInput
                page="register"
                label="Last name"
                name="lastName"
                type="text"
                placeholder="Last name"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <CustomSelect
                label="Collegiate"
                name="collegiate"
                type="select"
                placeholder="Select collegiate"
              >
                <option value="">Select Colleigate</option>
                <option value="CBAA">CBAA</option>
                <option value="CCJE">CCJE</option>
                <option value="CE">CE</option>
                <option value="CEAT">CEAT</option>
                <option value="CLAC">CLAC</option>
                <option value="CSCS">CSCS</option>
                <option value="CTHM">CTHM</option>
              </CustomSelect>
              <CustomInput
                page="register"
                label="Birth date"
                name="birthDate"
                type="date"
                placeholder="Birth"
                icon={<FaCalendar />}
              />
              <CustomInput
                page="register"
                label="Email"
                name="emailAddress"
                type="email"
                placeholder="Email"
                icon={<FaEnvelope />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CustomInput
                page="register"
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                icon={<BsFillShieldLockFill />}
              />

              <CustomInput
                page="register"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Password"
                icon={<BsShieldFillExclamation />}
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary w-full mt-4 ${
                loading ? "disabled:btn-primary opacity-75" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <img src={spinner} alt="" className="w-5 h-5 mr-2" />
                  <p>Creating account ...</p>
                </>
              ) : (
                "CREATE ACCOUNT"
              )}
            </button>
          </form>
        )}
      </Formik>
    </>
  );
}

export default RegisterProfessor;
