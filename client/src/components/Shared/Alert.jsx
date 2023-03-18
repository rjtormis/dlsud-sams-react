import React from "react";

function Alert({ icon, custom, msg }) {
  return (
    <div className={`alert  shadow-lg ${custom}`}>
      <div>
        {icon}
        <span>{msg}</span>
      </div>
    </div>
  );
}

export default Alert;
