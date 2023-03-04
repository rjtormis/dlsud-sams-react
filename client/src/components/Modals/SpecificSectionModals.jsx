import axios from "axios";
import { AiOutlineWechat, AiOutlineEdit } from "react-icons/ai";
import { BsCreditCard2FrontFill, BsFillTrashFill } from "react-icons/bs";
import { Formik } from "formik";

// Components
import Modal from "../../components/Shared/Modal";
import CustomInput from "../../components/Shared/CustomInput";
import CustomSelect from "../Shared/CustomSelect";
import useCookie from "../../hooks/useCookie";

function SpecificSectionModals({ name }) {
  const access = useCookie("csrf_access_token");
  const handleCreate = async (state, action) => {
    try {
      const response = await axios.post("/api/v1/subjects", state, {
        headers: {
          "X-CSRF-TOKEN": access,
        },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Modal id="create_subject">
        <div className="flex">
          <AiOutlineWechat size={30} className="mr-4" />
          <h3 className="font-bold text-xl text-green-700">ADD SUBJECT</h3>
        </div>
        <Formik
          initialValues={{
            subjectName: "",
            start: "",
            end: "",
            day: "",
          }}
          onSubmit={handleCreate}
        >
          {(props) => (
            <form className="flex flex-col" onSubmit={props.handleSubmit}>
              <CustomInput page="register" label="Subject Name" type="text" name="subjectName" />
              <div className="grid grid-cols-2 gap-4">
                <CustomInput page="register" label="Start" type="time" name="start" />
                <CustomInput page="register" label="End" type="time" name="end" />
              </div>
              <CustomSelect page="Register" label="Day" name="day">
                <option value="0">Select schedule day</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </CustomSelect>
              <input type="submit" value="CREATE" className="btn btn-primary mt-4" />
            </form>
          )}
        </Formik>
      </Modal>

      <Modal id="edit_section">
        <div className="flex">
          <BsCreditCard2FrontFill size={30} className="mr-4" />
          <h3 className="text-xl font-bold text-green-700">EDIT SECTION</h3>
        </div>
        <Formik></Formik>
      </Modal>

      <Modal id="delete_section">
        <div className="flex flex-col">
          <div className="flex">
            <BsFillTrashFill size={30} className="mr-4" />
            <h3 className="text-xl text-green-700 font-bold">Delete Section</h3>
          </div>
          <p className="text-center mt-4">Are you sure that you want to delete {name}?</p>
          <input type="submit" value="YES" className="btn btn-error mt-4" />
        </div>
      </Modal>
    </>
  );
}

export default SpecificSectionModals;
