import { api } from "../utilities/api";
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

export const generateNewAccessToken = (refresh_token) => {
  return axios.post("https://dlsud-sams-react-production.up.railway.app/refresh_token", null, {
    headers: { "X-CSRF-TOKEN": refresh_token },
  });
};

export const loginAuthorization = (state) => {
  return axios.post(
    "https://dlsud-sams-react-production.up.railway.app/login",
    { ...state },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
