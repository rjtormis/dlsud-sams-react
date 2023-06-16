/**
 * This file is all about AllSection actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * generatePresignedURLSection @ Generates the presigned url for image storage
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {section} - Contains the section details such as section.id
 *  @param {file_extension} - Contains what type of extension the image is. e.g jpeg,png
 *
 *
 * NewSectionCreation @ Creates new section
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {data} - Contains all the form data to be submitted on the backend.
 *
 * NewSectionCreation @ Saves the image location from AWS S3 to Database.
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {section} - Contains the section details such as section.id
 *  @param {link} - The Link of the image from AWS s3
 */

import axios from "axios";
axios.defaults.baseURL = "https://dlsud-sams-react-production.up.railway.app";

export const generatePresignedURLSection = (auth, section, file_extension) => {
  return axios.post(
    "/api/v1/section/get-pre-signed-url-section",
    { id: section.id, fileName: `s_${section.id}.${file_extension}` },
    { headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};

export const NewSectionCreation = (auth, data) => {
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
  return axios.post(
    `/api/v1/sections/${section.id}/upload`,
    { section_image: link },
    { headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};
