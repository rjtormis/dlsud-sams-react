import React from "react";

function Select({ styles, children, ...props }) {
  return (
    <select className={`select select-bordered ${styles} w-full`} {...props}>
      {children}
    </select>
  );
}

export default Select;
