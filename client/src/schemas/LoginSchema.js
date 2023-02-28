import * as yup from "yup";
import { email_regex } from "./Helper";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be DLSUD email")
    .matches(email_regex, "Must be DLSUD Email")
    .required("Required *"),
  password: yup.string().required("Required *"),
});
