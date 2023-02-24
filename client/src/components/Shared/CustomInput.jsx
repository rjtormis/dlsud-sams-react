import React from "react";
import { useField } from "formik";

function CustomInput({ page, label, icon, type, ...props }) {
  const [field, meta] = useField(props);
  console.log(page);
  const disableWheel = (e) => {
    e.target.blur();
  };

  return (
    <div className="form-control">
      <label htmlFor="" className="label">
        <span className={`custom-text-${page} label-text`}>{label}</span>
        {meta.error && meta.touched ? <p className={`custom-text-${page} text-error`}>{meta.error}</p> : null}
      </label>
      {icon ? (
        <div className="input-group">
          <span>{icon}</span>
          <input
            type={type}
            {...field}
            {...props}
            onWheel={type === "number" ? disableWheel : undefined}
            className={`input input-${meta.error && meta.touched ? "error" : "ghost"} input-bordered w-full`}
          />
        </div>
      ) : (
        <input
          type={type}
          {...field}
          {...props}
          maxLength={label === "Middle Initial" ? 1 : undefined}
          className={`input input-${meta.error && meta.touched ? "error" : "ghost"} input-bordered w-full`}
        />
      )}
    </div>
  );
}

export default CustomInput;
