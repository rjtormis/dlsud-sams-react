import axios from "axios";

export const api = axios.create({
  // baseURL: "https://dlsud-sams-react-production.up.railway.app",
  baseURL: "http://127.0.0.1:5000",
});

const access_token = localStorage.getItem("user");
console.log(access_token);
