import React from "react";

function Alert({ custom }) {
  return (
    <div className={`alert alert-success shadow-lg ${custom}`}>
      <div>
        <span>Account created successfully.</span>
      </div>
    </div>
  );
}

export default Alert;
