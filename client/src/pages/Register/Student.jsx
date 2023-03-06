// Components
import RegisterBody from "../../components/Register/RegisterBody";
import RegisterHeader from "../../components/Register/RegisterHeader";
import Alert from "../../components/Shared/Alert";

//Hooks
import useCreate from "../../hooks/useCreate";

function Student() {
  const { success } = useCreate();

  return (
    <>
      <RegisterHeader type="student" />
      {success ? <Alert custom={"mt-4"} /> : null}
      <RegisterBody type="student" />
    </>
  );
}
export default Student;
