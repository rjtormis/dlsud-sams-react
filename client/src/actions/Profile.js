import axios from "axios";
/**
 * This file is all about Profile actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * fetchProfilewithCollegiates @ Fetches the Profile / User Information along with the Collegiates (e.g CSCS,CLAC)
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *
 * getPresignedURL @ Generates the pre signed url in AWS S3 for Image upload
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {file_extension} - Contains what type of extension the image is. e.g jpeg,png
 *
 * update_profile @ Connects to the API end point and updates the user profile
 *  @param {profile} - Takes the profile object which contains the details e.g name,collegiate, and the like
 *  @param {auth} - Contains all the user details such as name,id and etc.
 *  @param {with_file} - Boolean to check if the user is also including a file to save / upload
 *  @param {location} - Location of the image from AWS s3. The Location is then saved to the database
 *  @param {rest} - The rest of the data which is also an object that contains name,collegiates and the likes
 */

export const fetchProfilewithCollegiates = (auth, id, type) => {
  return Promise.all([
    axios.get(`/api/v1/profiles/${id}/${type}`, {
      headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
    }),
    axios.get(`/api/v1/collegiates`, {
      headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
    }),
  ]);
};

export const getPresignedURL = (auth, file_extension) => {
  return axios.post(
    "/api/v1/user/get-pre-signed-url-profile",
    { id: auth.id, type: auth.type, fileName: `p_${auth.id}.${file_extension}` },
    {
      headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": auth.csrf_access_token },
    }
  );
};

export const update_profile = (profile, auth, with_file, location = "", rest, type) => {
  if (with_file && location !== "") {
    return axios.patch(
      `/api/v1/profiles/${profile.id}/${type}`,
      { ...rest, profile_image: location },
      { headers: { "X-CSRF-TOKEN": auth.csrf_access_token } }
    );
  }

  return axios.patch(
    `/api/v1/profiles/${profile.id}`,
    { ...rest, profile_image: "" },
    { headers: { "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};
