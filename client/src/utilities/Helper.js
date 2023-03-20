import axios from "axios";
export const aws_user_url = "https://aws-sams-storage.s3.ap-southeast-1.amazonaws.com/user/";
export const aws_section_url = "https://aws-sams-storage.s3.ap-southeast-1.amazonaws.com/section/";
export const name_regex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
export const name_regex_profile = /^[A-Za-z .]+$/;
export const email_regex = /^\w+@dlsud\.edu\.ph$/;
export const password_regex = /^(?=.*[A-Z])(?=.*\d).+$/;
export const numbers = [1, 2, 3, 4];
export const supported_file_format = ["image/png", "image/jpg", "image/jpeg"];
export const maxFileSize = 5242880;

export const upload_to_s3 = (url, data) => {
  return axios.post(url, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const ObjectIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
