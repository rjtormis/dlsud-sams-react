import { useField } from "formik";
function Input({ styles, ...props }) {
  const [fields, meta] = useField(props);
  const isError = meta.error && meta.touched;

  return (
    <input
      className={`input input-bordered ${styles} ${isError ? "input-error" : ""}`}
      {...props}
      {...fields}
    />
  );
}

export default Input;
