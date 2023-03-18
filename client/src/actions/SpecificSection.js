import axios from "axios";
/**
 * This file is all about SpecificSection actions. Actions that requires using axios
 * for fetching,posting,deleting,editing specific items from the backend.
 *
 * fetchSpecificSectionDetails
 *  @param {sectionName} - takes the sectionName once a specific section have been clicked
 *
 * EditSection, NewSubjectCreation,
 *  @param {section} - takes the section object
 *  @param {state} - accepts state object or the user input from the forms.
 *                 - check Formik documentation for more information.
 *  @param {auth} - takes the auth object that contains the user details.
 *
 * DeleteSection
 *  @param {section} - takes the section object
 *  @param {auth} - takes the auth object that contains the user details.
 *
 * EditSubject
 *  @param {section} - takes the section object
 *  @param {state} - accepts state object or the user input from the forms.
 *                 - check Formik documentation for more information.
 *  @param {auth} - takes the auth object that contains the user details.
 *  @param {subject} -takes the subject object
 *
 *  DeleteSubject
 * @param {section} - takes the section object
 * @param {subjectName} - takes the subjectName string
 * @param {auth} - takes the auth object that contains the user details.
 */

// Section

export const fetchSpecificSectionDetails = (sectionName) => {
  return Promise.all([
    axios.get(`/api/v1/sections/${sectionName}`),
    axios.get(`/api/v1/sections/${sectionName}/adviser`),
  ]);
};

export const EditSection = (section, state, auth) => {
  return axios.put(
    `/api/v1/sections/${section.section_full}`,
    { ...state },
    { headers: { "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};

export const DeleteSection = (section, auth) => {
  return axios.delete(`/api/v1/sections/${section.section_full}`, {
    headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
  });
};

// Subject

export const NewSubjectCreation = (section, state, auth) => {
  axios.post(
    "/api/v1/subjects",
    { sectionName: section.section_full, ...state },
    {
      headers: {
        "X-CSRF-TOKEN": auth.csrf_access_token,
      },
    }
  );
};

export const EditSubject = (section, state, auth, subject) => {
  return axios.patch(
    `/api/v1/subjects/${section.section_full}/${subject.subject_name}`,
    { ...state },
    { headers: { "X-CSRF-TOKEN": auth.csrf_access_token } }
  );
};

export const DeleteSubject = (section, subjectName, auth) => {
  return axios.delete(`/api/v1/subjects/${section.section_full}/${subjectName}`, {
    headers: { "X-CSRF-TOKEN": auth.csrf_access_token },
  });
};
