import { AiOutlineAppstoreAdd } from "react-icons/ai";

import { useContext } from "react";
import { Formik } from "formik";

// Components
import CustomSelect from "../../components/Shared/CustomSelect";
import Modal from "../../components/Shared/Modal";
import { registerClassroomSchema } from "../../schemas/RegisterSchema";
import axios from "axios";

// Context
import AuthContext from "../../context/AuthContext";

function Classroom() {
  const { auth } = useContext(AuthContext);

  const handleSubmit = async (state, action) => {
    console.log(state);
  };

  return (
    <>
      <h1 className="text-4xl">CLASSROOMS</h1>
      <div className="flex justify-end">
        <a href="#create" className="btn btn-primary mr-4">
          CREATE
        </a>
        <div className="form-control">
          <form action="">
            <div className="input-group input-group-sm">
              <input type="text" placeholder="Search" className="input input-bordered" />
              <button className="btn btn-primary btn-square">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* MODAL */}
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
            file: "",
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
                </label>
                <input
                  type="file"
                  name="file"
                  className="file-input file-input-ghost file-input-bordered"
                />
              </div>

              <input
                type="submit"
                className=" btn btn-primary mt-3 hover:btn-secondary"
                value="Submit"
              />
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
}
export default Classroom;
