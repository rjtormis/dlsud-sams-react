import axios from "axios";
import { AiOutlineWechat, AiOutlineEdit } from "react-icons/ai";
import { BsCreditCard2FrontFill, BsFillTrashFill } from "react-icons/bs";
import { Formik } from "formik";
import { Navigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// Components
import Modal from "../../components/Shared/Modal";
import CustomInput from "../../components/Shared/CustomInput";
import CustomSelect from "../Shared/CustomSelect";
import { useState } from "react";

// Hooks
import useAuth from "../../hooks/useAuth";

function SpecificSectionModals({ name, data }) {
  const { auth } = useAuth();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  if (isDeleted) {
    return <Navigate to="/dashboard/sections" />;
  }
  const handleCreate = async (state, action) => {
    try {
      const response = await axios.post(
        "/api/v1/subjects",
        { sectionName: name, ...state },
        {
          headers: {
            "X-CSRF-TOKEN": 1234,
          },
        }
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (state, action) => {
    try {
      const response = await axios.post();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/v1/sections/${name}`, {
        headers: { "X-CSRF-TOKEN": 123 },
      });
      setIsDeleted(true);
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
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
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
        <Formik
          initialValues={{
            course: data ? data.course : "",
            year: data ? data.year : "",
            section: data ? data.section : "",
            file: undefined,
          }}
          onSubmit={handleEdit}
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
              <CustomSelect
                page="register"
                label="Course"
                name="course"
                value={props.values.course}
                onChange={props.handleChange}
              >
                <option value="">Select course</option>
                <option value="IT">Information Technology</option>
                <option value="CS">Computer Science</option>
              </CustomSelect>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <CustomSelect
                  page="register"
                  label="Year"
                  name="year"
                  value={props.values.year}
                  onChange={props.handleChange}
                >
                  <option value="0">Select section level</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </CustomSelect>
                <CustomSelect
                  page="register"
                  label="Section"
                  name="section"
                  value={props.values.section}
                  onChange={props.handleChange}
                >
                  <option value="0">Select section level</option>
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

      <Modal id="delete_section">
        <form action="" onSubmit={handleDelete}>
          <div className="flex flex-col">
            <div className="flex">
              <BsFillTrashFill size={30} className="mr-4" />
              <h3 className="text-xl text-green-700 font-bold">Delete Section</h3>
            </div>
            <p className="text-center mt-4">
              Are you sure that you want to delete <span>{name}</span>
            </p>

            <input type="submit" value="YES" className="btn btn-error mt-4" />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default SpecificSectionModals;
