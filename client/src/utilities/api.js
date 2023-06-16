import axios from "axios";

export const api = axios.create({
  baseURL: "https://dlsud-sams-react-production.up.railway.app",
});
