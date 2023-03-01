import { useContext } from "react";

// Components
import RegisterBody from "../../components/Register/RegisterBody";
import RegisterHeader from "../../components/Register/RegisterHeader";
import Alert from "../../components/Shared/Alert";

// Context
import CreateContext from "../../context/CreateContext";

function Student() {
  const { success } = useContext(CreateContext);

  return (
    <>
      <RegisterHeader type="student" />
      {success ? <Alert custom={"mt-4"} /> : null}
      <RegisterBody type="student" />
    </>
  );
}
export default Student;
