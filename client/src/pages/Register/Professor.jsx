import { useState } from "react";

// Components
import RegisterHeader from "../../components/Register/RegisterHeader";
import RegisterBody from "../../components/Register/RegisterBody";
import Alert from "../../components/Shared/Alert";

function Professor() {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <RegisterHeader type="professor" />
      {success ? <Alert custom={"mt-4"} /> : null}
      <RegisterBody success={(e) => setSuccess(e)} type="professor" />
    </>
  );
}
export default Professor;
