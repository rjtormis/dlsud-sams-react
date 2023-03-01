import { useContext } from "react";

// Components
import RegisterHeader from "../../components/Register/RegisterHeader";
import RegisterBody from "../../components/Register/RegisterBody";
import Alert from "../../components/Shared/Alert";

// Context
import CreateContext from "../../context/CreateContext";

function Professor() {
  const { success } = useContext(CreateContext);
  return (
    <>
      <RegisterHeader type="professor" />
      {success ? <Alert custom={"mt-4"} /> : null}
      <RegisterBody type="professor" />
    </>
  );
}
export default Professor;
