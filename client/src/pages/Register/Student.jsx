import { useState } from "react";
// Components
import RegisterBody from "../../components/Register/RegisterBody";
import RegisterHeader from "../../components/Register/RegisterHeader";
import Alert from "../../components/Shared/Alert";

function Student() {
  const [success, setSuccess] = useState(false);

  return (
    <>
      <RegisterHeader type="student" />
      {success ? <Alert custom={"mt-4"} /> : null}
      <RegisterBody success={(e) => setSuccess(e)} type="student" />
    </>
  );
}
export default Student;
