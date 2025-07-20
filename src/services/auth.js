import axios from "axios";

export const apiLogin = async (payload) => {
  const response = await axios.post(
    "https://craft-connect-backend.onrender.com/api/auth/login",
    payload
  );
  return response.data;
};

export const apiSignup = async (payload) => {
  const response = await axios.post("https://craft-connect-backend.onrender.com/api/auth/signup", payload);
  return response.data;
};
