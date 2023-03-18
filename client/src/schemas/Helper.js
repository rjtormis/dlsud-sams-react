import axios from "axios";
export const name_regex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
export const name_regex_profile = /^[A-Za-z .]+$/;
export const email_regex = /^\w+@dlsud\.edu\.ph$/;
export const password_regex = /^(?=.*[A-Z])(?=.*\d).+$/;
export const numbers = [1, 2, 3, 4];
export const supported_file_format = ["image/png", "image/jpg", "image/jpeg"];
export const maxFileSize = 5242880;
