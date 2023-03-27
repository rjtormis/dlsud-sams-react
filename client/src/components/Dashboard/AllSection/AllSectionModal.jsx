import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { useState } from "react";
import { Formik } from "formik";
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

// Actions
import {
  generatePresignedURLSection,
  NewSectionCreation,
  NewSectionImageUpload,
} from "../../../actions/AllSection";

// Helper
import { maxFileSize, supported_file_format, upload_to_s3 } from "../../../utilities/Helper";

function AllSectionModal() {
  //
  const navigate = useNavigate();

  const { setReFetch, isModalOpen, setIsModalOpen } = useAllSection();
  const { auth } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (state, action) => {
    const { file, ...data } = state;
    setLoading(true);
    try {
      if (
        file !== undefined &&
        file.size <= maxFileSize &&
        supported_file_format.includes(file.type)
      ) {
        const formData = new FormData();
        const file_extension = file.name.split(".")[1];

        const { data: section } = await NewSectionCreation(auth, data);
        const {
          data: {
            signed_url: { fields, url },
            location,
          },
        } = await generatePresignedURLSection(auth, section, file_extension);

        Object.entries(fields).forEach(([key, value]) => {
          formData.append(key, value);
        });
        formData.append("file", file);
        await upload_to_s3(url, formData);
        await NewSectionImageUpload(auth, section, location);
        setReFetch(true);
        action.resetForm();
        setIsModalOpen(false);
        setLoading(false);
        navigate("/dashboard/sections");
      } else {
        await NewSectionCreation(auth, data);
        setLoading(false);
        action.resetForm();
        setReFetch(true);
        setIsModalOpen(false);
        navigate("/dashboard/sections");
      }
    } catch (e) {
      setLoading(false);
      setIsModalOpen(true);
      console.log(e);
      const { status, message } = e.response.data;

      if (status === 409) {
        action.setFieldError("course", `${message}`);
        action.setFieldError("year", "‎");
        action.setFieldError("section", "‎");
      }
    }
  };
  return (
    <>
      {isModalOpen ? (
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
                  {loading ? (
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
      ) : (
        ""
      )}
    </>
  );
}

export default AllSectionModal;
