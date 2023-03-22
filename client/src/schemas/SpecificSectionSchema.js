import * as yup from "yup";

// Sections

export const editSectionSchema = yup.object().shape({
  course: yup.string().oneOf(["IT", "CS"], "Please select a course").required("Required *"),
  year: yup.number().oneOf([1, 2, 3, 4], "Please select year level").required("Required *"),
  section: yup.number().oneOf([1, 2, 3, 4], "Please section level").required("Required *"),
  file: yup.mixed().test("fileFormat", "Unsupported File Type", (file) => {
    let valid = true;
    if (file) {
      const supportedFormat = ["image/png", "image/jpeg", "image/jpg"];
      if (!supportedFormat.includes(file.type)) {
        valid = false;
      }
    }
    return valid;
  }),
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
