import axios from "axios";
/**
 * This file is all about authorization actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * requestAccesToken
 *  @param {refresh_token} - accepts refresh token saved from local storage.
 *
 * loginAuthorization
 * @param {state} - accepts state object or the user input from the forms.
 *                - check Formik documentation for more information.
 *
 */
if (process.env.REACT_APP_ENV === "DEV") {
  axios.defaults.baseURL = "http://127.0.0.1:5000";
} else if (process.env.REACT_APP_ENV === "PROD") {
  axios.defaults.baseURL = process.env.REACT_APP_API;
}
export const generateNewAccessToken = (auth) => {
  return axios.post("/refresh_token", null, {
    headers: { Authorization: `Bearer ${auth.access_token}` },
  });
};

export const loginAuthorization = (state) => {
  return axios.post(
    "/login",
    { ...state },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
