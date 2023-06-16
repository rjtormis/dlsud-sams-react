import { api } from "../utilities/api";
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

export const studentAccountCreation = (state) => {
  console.log(state);
  return api.post(
    "https://dlsud-sams-react-production.up.railway.app/api/v1/users",
    { ...state, type: "student" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const professorAccountCreation = (state) => {
  return api.post(
    "/api/v1/users",
    { ...state, type: "professor" },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
