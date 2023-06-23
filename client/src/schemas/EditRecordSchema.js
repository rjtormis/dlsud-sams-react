import * as yup from "yup";

export const editRecordSchema = yup.object().shape({
  type: yup.string().required("Required"),
  qDate: yup.string().required("*"),
});
