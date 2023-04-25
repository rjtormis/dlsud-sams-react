import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
// Components
import RegisterHeader from "../../components/Register/RegisterHeader";
import RegisterBody from "../../components/Register/RegisterBody";
import Alert from "../../components/Shared/Alert";

function Professor() {
  const [success, setSuccess] = useState(false);
  return (
    <>
      <RegisterHeader type="professor" />
      {success ? (
        <Alert
          icon={<AiOutlineCheckCircle />}
          msg="Account created sucessfully."
          custom="alert-success mt-4"
        />
      ) : null}
      <RegisterBody success={(e) => setSuccess(e)} type="professor" />
    </>
  );
}
export default Professor;
