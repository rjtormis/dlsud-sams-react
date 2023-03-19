import axios from "axios";
/**
 * This file is all about Profile actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 */

export const fetchProfilewithCollegiates = (auth) => {
  return Promise.all([
    axios.get(`/api/v1/profiles/${auth.id}`, {
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

export const update_profile = (profile, auth, with_file, location = "", rest) => {
  if (with_file && location !== "") {
    return axios.patch(
      `/api/v1/profiles/${profile.id}`,
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
