import React from "react";
import { Formik } from "formik";
import { FaEnvelope, FaBuilding, FaCalendar } from "react-icons/fa";

import { BsFillShieldLockFill, BsShieldFillExclamation } from "react-icons/bs";

import CustomInput from "../Shared/CustomInput";
import CustomSelect from "../Shared/CustomSelect";
import { registerProfessorSchema } from "../../schemas/RegisterSchema";

function RegisterProfessor() {
  const handleSubmit = (state, action) => {
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
            <div className="grid grid-cols-3 gap-4">
              <CustomInput page="register" label="First name" name="firstName" type="text" placeholder="First name" />
              <CustomInput
                page="register"
                label="Middle Initial"
                name="middleInitial"
                type="text"
                placeholder="Middle Initial"
              />
              <CustomInput page="register" label="Last name" name="lastName" type="text" placeholder="Last name" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <CustomSelect label="Collegiate" name="collegiate" type="select" placeholder="Select collegiate">
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

export default RegisterProfessor;
