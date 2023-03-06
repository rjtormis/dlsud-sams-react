import { useContext } from "react";

// Components
import RegisterHeader from "../../components/Register/RegisterHeader";
import RegisterBody from "../../components/Register/RegisterBody";
import Alert from "../../components/Shared/Alert";

// Hooks
import useCreate from "../../hooks/useCreate";

function Professor() {
  const { success } = useCreate();
  return (
    <>
      <RegisterHeader type="professor" />
      {success ? <Alert custom={"mt-4"} /> : null}
      <RegisterBody type="professor" />
    </>
  );
}
export default Professor;
