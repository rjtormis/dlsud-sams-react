import React from "react";
import { Formik } from "formik";
import axios from "axios";
import { HiIdentification } from "react-icons/hi";
import { FaEnvelope } from "react-icons/fa";
import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

import { registerStudentSchema } from "../../schemas/RegisterSchema";
import CustomInput from "../Shared/CustomInput";

function RegisterStudent() {
  const handleSubmit = async (state, action) => {
    try {
      const response = await axios.post(
        "/api/v1/users",
        { ...state, type: "student" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      action.resetForm();
    } catch (e) {
      console.log(e);
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
          <form action="" className="mt-10" onSubmit={props.handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-3 gap-4">
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
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                page="register"
                label="Student Number"
                name="studentNumber"
                type="number"
                placeholder="Student no."
                customProp="number"
                icon={<HiIdentification />}
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

            <div className="grid grid-cols-2 gap-4">
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

            <input type="submit" value="CREATE ACCOUNT" className="btn btn-primary w-full mt-4" />
          </form>
        )}
      </Formik>
    </>
  );
}

export default RegisterStudent;
