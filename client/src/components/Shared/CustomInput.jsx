import { useField } from "formik";
import FormControl from "./FormControl";
import Input from "./Input";

function CustomInput({ label, page, ...props }) {
  const [fields, meta] = useField(props);
  const isError = meta.error && meta.touched;
  const errorMessage = meta.error;
  return (
    <FormControl label={label} page={page} error={isError} msg={errorMessage}>
      <Input styles={isError ? "input-error" : "input-ghost"} {...fields} {...props} />
    </FormControl>
  );
}

export default CustomInput;
