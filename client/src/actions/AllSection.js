import axios from "axios";
/**
 * This file is all about AllSection actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * NewSectionCreation
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {data} - Contains all the form data to be submitted on the backend.
 */

export const NewSectionCreation = (auth, data) => {
  return axios.post("/api/v1/sections", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-CSRF-TOKEN": auth.csrf_access_token,
    },
  });
};
