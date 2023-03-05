import { useField } from "formik";
import FormControl from "./FormControl";
import InputGroup from "./InputGroup";

function CustomInputGroup({ icon, label, page, ...props }) {
  const [fields, meta] = useField(props);
  const isError = meta.error && meta.touched;
  const errorMessage = meta.error;

  return (
    <FormControl label={label} page={page} error={isError} msg={errorMessage}>
      <InputGroup
        icon={icon}
        styles={isError ? "input-error" : "input-ghost"}
        {...fields}
        {...props}
      />
    </FormControl>
  );
}

export default CustomInputGroup;
