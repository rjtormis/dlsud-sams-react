import PropTypes from "prop-types";
import { useField } from "formik";

function CustomInput({ page, customProp, label, icon, type, ...props }) {
  const [field, meta] = useField(props);

  const disableWheel = (e) => {
    e.target.blur();
  };

  return (
    <div className="form-control">
      <label htmlFor="" className="label">
        <span className={`custom-text-${page} label-text`}>{label}</span>
        {meta.error && meta.touched ? (
          <p className={`custom-text-${page} text-error`}>{meta.error}</p>
        ) : null}
      </label>
      {icon ? (
        <div className="input-group">
          <span>{icon}</span>
          <input
            type={type}
            {...field}
            {...props}
            onWheel={type === customProp ? disableWheel : undefined}
            maxLength={label === customProp ? 1 : undefined}
            className={`input ${
              meta.error && meta.touched ? "input-error" : "input-ghost"
            } input-bordered w-full`}
          />
        </div>
      ) : (
        <input
          type={type}
          {...field}
          {...props}
          onWheel={type === customProp ? disableWheel : undefined}
          maxLength={label === customProp ? 1 : undefined}
          className={`input input-${
            meta.error && meta.touched ? "error" : "ghost"
          } input-bordered w-full`}
        />
      )}
    </div>
  );
}

CustomInput.propTypes = {
  page: PropTypes.string,
  customProp: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.object,
  props: PropTypes.object,
};

export default CustomInput;
