import React, { useContext, useState } from "react";
import { Formik } from "formik";
import axios from "axios";

//Icons
import { HiIdentification } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

// Schema
import { registerStudentSchema } from "../../schemas/RegisterSchema";

//Components
import CustomInput from "../Shared/CustomInput";
import spinner from "../../assets/spinner.gif";

// Context
import CreateContext from "../../context/CreateContext";

function RegisterStudent() {
  const { setSuccess } = useContext(CreateContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state, action) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/v1/users",
        { ...state, type: "student" },
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
        }, 1500);
      }
    } catch (e) {
      setLoading(false);
      if (e.response.data["msg"] === "Student no. already taken.") {
        action.setFieldError("studentNumber", "Student no. already exists.");
      } else if (e.response.data["msg"] === "Email already taken.") {
        action.setFieldError("emailAddress", "Email already exists.");
      } else if (e.response.data["msg"] === "Student number & Email already taken.") {
        action.setFieldError("studentNumber", "Student no. already exists.");
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
          studentNumber: "",
          emailAddress: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerStudentSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form action="" className="mt-10 " onSubmit={props.handleSubmit}>
            {/* Name */}
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
                customProp="Middle Initial"
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

            {/* Student ID, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <CustomInput
                page="register"
                label="Student Number"
                name="studentNumber"
                id="studentNumber"
                type="number"
                placeholder="Student no."
                customProp="number"
                icon={<HiIdentification />}
              />

              <CustomInput
                page="register"
                label="Email"
                name="emailAddress"
                id="emailAddress"
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
              id="my-modal"
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

export default RegisterStudent;
