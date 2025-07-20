import axios from "axios";

export const apiLogin = async (payload) => {
  const response = await axios.post(
    "http://localhost:4000/api/auth/login",
    payload
  );
  return response.data;
};

export const apiSignup = async (payload) => {
  const response = await axios.post("/api/auth/signup", payload);
  return response.data;
};
