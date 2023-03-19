import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useState } from "react";
import { Formik, replace } from "formik";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// Components
import CustomSelect from "../../Shared/CustomSelect";
import Modal from "../../Shared/Modal";

// Schema
import { registerClassroomSchema } from "../../../schemas/RegisterSchema";

// Context
import { useAuth } from "../../../context/AuthContext";
import { useAllSection } from "../../../context/AllSectionContext";
import { NewSectionCreation } from "../../../actions/AllSection";
import { maxFileSize, supported_file_format } from "../../../schemas/Helper";

function AllSectionModal() {
  const [isLoading, setIsLoading] = useState(false);
  const { auth } = useAuth();
  const { sections, dispatch } = useAllSection();
  const navigate = useNavigate();

  const handleSubmit = async (state, action) => {
    const { file, ...rest } = state;
    // setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    // try {

    //   if (file !== undefined && file.size <= maxFileSize && supported_file_format.includes(file.type)){

    //   }

    //   const createNewSection = await NewSectionCreation(auth, );
    //   const section = createNewSection.data;
    //   setIsLoading(false);
    //   action.resetForm();
    //   // navigate(`/dashboard/sections/${section.section_full}`);
    // } catch (e) {
    //   setIsLoading(false);
    //   if (e.response.status === 409) {
    //     action.setFieldError("course", `${e.response.data["msg"]}`);
    //     action.setFieldError("year", "‎");
    //     action.setFieldError("section", "‎");
    //   }
    // }
  };

  return (
    <>
      <Modal id="create">
        <div className="flex">
          <AiOutlineAppstoreAdd className="block mr-2" size={30} />
          <h3 className="font-bold text-xl text-green-700">ADD CLASSROOM</h3>
        </div>
        <Formik
          initialValues={{
            course: "",
            year: "",
            section: "",
            file: undefined,
          }}
          validationSchema={registerClassroomSchema}
          onSubmit={handleSubmit}
        >
          {(props) => (
            <form
              action=""
              className="
            flex flex-col
          "
              encType="multipart/form-data"
              onSubmit={props.handleSubmit}
            >
              <CustomSelect page="register" label="Course" name="course">
                <option value="">Select course</option>
                <option value="IT">Information Technology</option>
                <option value="CS">Computer Science</option>
              </CustomSelect>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <CustomSelect page="register" label="Year" name="year">
                  <option value="0">Select section level</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </CustomSelect>
                <CustomSelect page="register" label="Section" name="section">
                  <option value="0">Select year level</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </CustomSelect>
              </div>
              <div className="form-control mt-3">
                <label htmlFor="" className="label">
                  <span className="label-text">Custom Background (Optional)</span>
                  {props.errors.file && (
                    <p className={`custom-text-register text-error`}>{props.errors.file}</p>
                  )}
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    props.setFieldValue("file", e.currentTarget.files[0]);
                  }}
                  className="file-input file-input-ghost file-input-bordered"
                />
              </div>
              <div className="flex justify-center mt-4">
                {isLoading ? (
                  <ClipLoader />
                ) : (
                  <input
                    type="submit"
                    className=" btn w-full btn-primary hover:btn-secondary"
                    value="Submit"
                  />
                )}
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}

export default AllSectionModal;
