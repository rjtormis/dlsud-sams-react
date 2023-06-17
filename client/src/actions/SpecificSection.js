/**
 * This file is all about SpecificSection actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * fetchSpecificSectionDetails @ Fetches the specific Section information
 *  @param {sectionName} - takes the sectionName once a specific section have been clicked
 *
 * EditSection, NewSubjectCreation, @ Handles the edit of Section & Subject Creation.
 *  @param {section} - takes the section object
 *  @param {state} - accepts state object or the user input from the forms.
 *                 - check Formik documentation for more information.
 *  @param {auth} - takes the auth object that contains the user details.
 *
 * DeleteSection @ Handles the delete section
 *  @param {section} - takes the section object
 *  @param {auth} - takes the auth object that contains the user details.
 *
 * EditSubject @ Handles the editing of subject
 *  @param {section} - takes the section object
 *  @param {state} - accepts state object or the user input from the forms.
 *                 - check Formik documentation for more information.
 *
 *  @param {auth} - takes the auth object that contains the user details.
 *  @param {subject} -takes the subject object
 *
 *  DeleteSubject @ Handles the deleting of subject.
 * @param {section} - takes the section object
 * @param {subjectName} - takes the subjectName string
 * @param {auth} - takes the auth object that contains the user details.
 */

import axios from "axios";
axios.defaults.baseURL = "https://dlsud-sams-react-production.up.railway.app";
// axios.defaults.baseURL = "http://127.0.0.1:5000";

export const fetchSpecificSectionDetails = (auth, sectionName) => {
  return Promise.all([
    axios.get(`/api/v1/sections/${sectionName}`, {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }),
    axios.get(`/api/v1/sections/${sectionName}/adviser`, {
      headers: { Authorization: `Bearer ${auth.access_token}` },
    }),
  ]);
};

export const EditSection = (section, state, auth) => {
  return axios.put(
    `/api/v1/sections/${section.section_full}`,
    { ...state },
    { headers: { Authorization: `Bearer ${auth.access_token}` } }
  );
};

export const DeleteSection = (section, auth) => {
  return axios.delete(`/api/v1/sections/${section.section_full}`, {
    headers: { Authorization: `Bearer ${auth.access_token}` },
  });
};

// Subject

export const NewSubjectCreation = (section, state, auth) => {
  return axios.post(
    "/api/v1/subjects",
    { sectionName: section.section_full, ...state },
    {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }
  );
};

export const EditSubject = (section, state, auth, subject) => {
  return axios.patch(
    `/api/v1/subjects/${section.section_full}/${subject.subject_name}`,
    { ...state },
    { headers: { Authorization: `Bearer ${auth.access_token}` } }
  );
};

export const DeleteSubject = (section, subjectName, auth) => {
  return axios.delete(`/api/v1/subjects/${section.section_full}/${subjectName}`, {
    headers: { Authorization: `Bearer ${auth.access_token}` },
  });
};
