import * as yup from "yup";
import { name_regex, email_regex, password_regex, isAvailable } from "./Helper";

export const registerStudentSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(name_regex, "First name can only contain letters.")
    .min(3, "Minimum of 3 characters.")
    .max(16, "Maximum of 16 characters.")
    .required("Required *"),
  middleInitial: yup
    .string()
    .matches(name_regex, "Middle Initial can only contain letters.")
    .max(1, "Maximum of 1 character")
    .required("Required *"),
  lastName: yup
    .string()
    .matches(name_regex, "Last name can only contain letters.")
    .min(2, "Minimum of 2 characters.")
    .max(16, "Maximum of 16 characters.")
    .required("Required *"),
  studentNumber: yup
    .number()
    .test("isValidLength", "Student no. must be 9 digits", (value) => String(value).length === 9),
  emailAddress: yup.string().matches(email_regex, "DLSUD email only.").required("Required *"),
  password: yup
    .string("Required *")
    .min(5, "Minimum of 5 Characters.")
    .matches(password_regex, "Password must contain 1 uppercase and 1 numeric.")
    .required("Required *"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Required *"),
});

export const registerProfessorSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(name_regex, "First name can only contain letters.")
    .min(3, "Minimum of 3 characters.")
    .max(16, "Maximum of 16 characters.")
    .required("Required *"),
  middleInitial: yup
    .string()
    .matches(name_regex, "Middle Initial can only contain letters.")
    .max(1, "Maximum of 1 character.")
    .required("Required *"),
  lastName: yup
    .string()
    .matches(name_regex, "Last name can only contain letters.")
    .min(2, "Minimum of 2 characters.")
    .max(16, "Maximum of 16 characters.")
    .required("Required *"),
  collegiate: yup
    .string()
    .oneOf(["CBAA", "CCJE", "CE", "CEAT", "CLAC", "CSCS", "CSCS", "CTHM"])
    .required("Required *"),
  emailAddress: yup.string().matches(email_regex, "DLSUD email only.").required("Required *"),
  password: yup
    .string("Required *")
    .min(5, "Minimum of 5 Characters")
    .matches(password_regex, "Password must contain 1 uppercase.")
    .required("Required *"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match.")
    .required("Required *"),
});
