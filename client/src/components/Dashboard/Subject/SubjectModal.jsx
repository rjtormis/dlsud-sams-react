import { BsCreditCard2FrontFill, BsFillTrashFill } from "react-icons/bs";
import { Formik } from "formik";
import axios from "axios";

// Components
import Modal from "../../Shared/Modal";
import CustomInput from "../../Shared/CustomInput";
import CustomSelect from "../../Shared/CustomSelect";

// Hooks
import useAuth from "../../../hooks/useAuth";
import useSpecificSection from "../../../hooks/useSpecificSection";

function SubjectModal() {
  const { auth } = useAuth();

  const { section, subjectName } = useSpecificSection();

  const handleDeleteSubject = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `/api/v1/subjects/${section.section_full}/${subjectName}`,
        { headers: { "X-CSRF-TOKEN": auth.csrf_access_token } }
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal id="edit_subject">
        <Formik
          initialValues={{
            subjectName: "",
            start: "",
            end: "",
            day: "",
          }}
        >
          {(props) => (
            <form className="flex flex-col">
              <CustomInput page="register" label="Subject Name" type="text" name="subjectName" />
              <div className="grid grid-cols-2 gap-4">
                <CustomInput page="register" label="Start" type="time" name="start" />
                <CustomInput page="register" label="End" type="time" name="end" />
              </div>
              <CustomSelect page="Register" label="Day" name="day">
                <option value="0">Select schedule day</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </CustomSelect>
              <div className="flex justify-center mt-4">
                <input type="submit" value="CREATE" className="btn btn-primary w-full" />
              </div>
            </form>
          )}
        </Formik>
      </Modal>

      <Modal id="delete_subject">
        <form onSubmit={handleDeleteSubject}>
          <div className="flex flex-col">
            <div className="flex">
              <BsFillTrashFill size={30} className="mr-4" />
              <h3 className="text-xl text-green-700 font-bold">Delete Subject</h3>
            </div>
            <p className="text-center mt-4">Are you sure that you want to delete this subject?</p>
            <input type="submit" value="YES" className="btn btn-error mt-4" />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SubjectModal;
