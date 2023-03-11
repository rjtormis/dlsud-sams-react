import { numbers } from "./Helper";
import * as yup from "yup";
const moment = require("moment");

// Sections

export const editSectionSchema = yup.object().shape({
  course: yup.string().oneOf(["IT", "CS"], "Please select a course").required("Required *"),
  year: yup.number().oneOf([numbers], "Please select year level").required("Required *"),
  section: yup.number().oneOf([numbers], "Please section level").required("Required *"),
});

// Subjects
export const addSubjectSchema = yup.object().shape({
  subjectName: yup
    .string()
    .min(5, "Minimum of 5 Characters")
    .max(30, "Maximum of 30 characters")
    .required("Required *"),
  start: yup.string().required("Required *"),
  end: yup.string().required("required *"),
  day: yup
    .string()
    .oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
    .required("Required *"),
});

export const editSubjectSchema = yup.object().shape({
  subjectName: yup
    .string()
    .min(5, "Minimum of 5 Characters")
    .max(30, "Maximum of 30 characters")
    .required("Required *"),
  start: yup.string().required("Required *"),
  end: yup.string().required("required *"),
  day: yup
    .string()
    .oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])
    .required("Required *"),
});
