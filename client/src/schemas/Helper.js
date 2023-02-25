import axios from "axios";
export const name_regex = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;
export const email_regex = /^\w+@dlsud\.edu\.ph$/;
export const password_regex = /^(?=.*[A-Z])(?=.*\d).+$/;

// Helper fetch api for both student_number & emailAddress
// Since we can't use useFetch in plain JS =(
export const isAvailable = async (condition, endpoint) => {
  try {
    const response = await axios.get(`/api/v1/${endpoint}`, {
      params: { q: condition },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.Available;
  } catch (e) {
    console.log(e);
  }
};
