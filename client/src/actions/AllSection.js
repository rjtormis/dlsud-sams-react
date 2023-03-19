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

export const NewSectionCreation = (auth, data) => {
  console.log(data);
  return axios.post(
    "/api/v1/sections",
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": auth.csrf_access_token,
      },
    }
  );
};

export const NewSectionImageUpload = (auth, section, link) => {
  console.log(section);
  return axios.post(
    `/api/v1/sections/${section.id}/upload`,
    { section_image: link },
    { headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};
