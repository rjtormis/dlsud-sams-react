import * as yup from "yup";

const name = /^[a-zA-Z]+$/;
const student_number = /^\d+$/;
const email = /^\w+@dlsud\.edu\.ph$/;
const password = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;

export const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(name, "First name can only contain letters")
    .min(3, "Minimum of 3 characters")
    .max(16, "Maximum of 16 characters")
    .required("Required *"),
  middleInitial: yup
    .string()
    .matches(name, "Middle Initial can only contain letters")
    .max(1, "Maximum of 1 character")
    .required("Required *"),
  lastName: yup
    .string()
    .matches(name, "Last name can only contain letters")
    .min(2, "Minimum of 2 characters")
    .max(16, "Maximum of 16 characters")
    .required("Required *"),
  studentNumber: yup
    .number()
    .positive("Should not be negative")
    .min(9, "Should contain exactly 9 characters without special characters")
    .max(9)
    .required("Required *"),
  emailAddress: yup.string().matches(email, "DLSUD email only").required("Required *"),
  password: yup
    .string("Required *")
    .min(5, "Minimum of 5 Characters")
    .matches(password, "Password must contain 1 uppercase")
    .required("Required *"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match")
    .required("Required *"),
});
