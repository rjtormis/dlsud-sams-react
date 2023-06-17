/**
 * This file is all about Regsiter actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * studentAccountCreation
 *  @param {state} - accepts state or the user input from the forms.
 *                 - check Formik documentation for more information.
 *
 * professorAccountCreation
 * @param {state} - accepts state object or the user input from the forms.
 *                - check Formik documentation for more information.
 */

import axios from "axios";
axios.defaults.baseURL = "https://dlsud-sams-react-production.up.railway.app";
// axios.defaults.baseURL = "http://127.0.0.1:5000";

export const studentAccountCreation = (state) => {
  return axios.post(
    "/api/v1/users",
    { ...state, type: "student" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const professorAccountCreation = (state) => {
  return axios.post(
    "/api/v1/users",
    { ...state, type: "professor" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
