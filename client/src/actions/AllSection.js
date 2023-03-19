import axios from "axios";
/**
 * This file is all about AllSection actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * NewSectionCreation
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {data} - Contains all the form data to be submitted on the backend.
 */

export const generatePresignedURLSection = (auth, section, file_extension) => {
  return axios.post(
    "/api/v1/section/get-pre-signed-url-section",
    { id: section.id, fileName: `s_${section.id}.${file_extension}` },
    { headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};

export const NewSectionCreation = (auth, with_file, location = "", rest) => {
  if (with_file && location !== "") {
  }

  return axios.post(
    "/api/v1/sections",
    { ...rest },
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": auth.csrf_access_token,
      },
    }
  );
};
