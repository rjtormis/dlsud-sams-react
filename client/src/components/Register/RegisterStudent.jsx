import React from "react";
import { Formik } from "formik";
import { HiIdentification } from "react-icons/hi";

import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

import { FaEnvelope } from "react-icons/fa";

import { registerSchema } from "../../schemas/Register";
import CustomInput from "../Shared/CustomInput";

function RegisterStudent({ type }) {
  const handleSubmit = (e, state, action) => {
    e.preventDefault();
    console.log(state);
    console.log(action);
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
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <form action="" className="mt-10" onSubmit={props.handleSubmit}>
            {/* Name */}
            <div className="grid grid-cols-3 gap-4">
              <CustomInput label="First name" name="firstName" type="text" placeholder="First name" />
              <CustomInput label="Middle Initial" name="middleInitial" type="text" placeholder="Middle Initial" />
              <CustomInput label="Last name" name="lastName" type="text" placeholder="Last name" />
            </div>

            {/* Student ID, Email */}
            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Student Number"
                name="studentNumber"
                type="number"
                placeholder="Student no."
                icon={<HiIdentification />}
              />

              <CustomInput label="Email" name="emailAddress" type="email" placeholder="Email" icon={<FaEnvelope />} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CustomInput
                label="Password"
                name="password"
                type="password"
                placeholder="Password"
                icon={<BsFillShieldLockFill />}
              />

              <CustomInput
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
