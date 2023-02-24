import React from "react";
import { useField } from "formik";

function CustomSelect({ page, label, icon, ...props }) {
  const [fields, meta] = useField(props);
  return (
    <div className="form-control">
      <label htmlFor="" className="label">
        <span className="label-text">{label}</span>
        {meta.error && meta.touched ? <p className={`custom-text-${page} text-error`}>{meta.error}</p> : null}
      </label>
      {icon ? (
        <div className="input-group">
          <span>{icon}</span>
          <select
            className={`select select-${meta.error && meta.touched ? "error" : "ghost"} select-bordered  `}
            {...fields}
            {...props}
          />
        </div>
      ) : (
        <select
          className={`select select-${meta.error && meta.touched ? "error" : "ghost"} select-bordered `}
          {...fields}
          {...props}
        />
      )}
    </div>
  );
}

export default CustomSelect;
