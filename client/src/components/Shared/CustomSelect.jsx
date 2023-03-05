import { useField } from "formik";
import FormControl from "./FormControl";
import Select from "./Select";

function CustomSelect({ label, page, children, ...props }) {
  const [field, meta] = useField(props);
  const isError = meta.error && meta.touched;
  const msg = meta.error;
  return (
    <FormControl label={label} page={page} error={isError} msg={msg}>
      <Select styles={isError ? "select-error" : "select-ghost"} {...field} {...props}>
        {children}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
