import axios from "axios";

const baseUrl = "https://craft-connect-backend.onrender.com";

export const apiLogin = async (payload) => {
  const response = await axios.post(`${baseUrl}/api/auth/login`, payload);
  return response.data;
};

export const apiSignup = async (payload) => {
  const response = await axios.post(`${baseUrl}/api/auth/signup`, payload);
  return response.data;
};

export const forgotPassword = async (payload) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/forgot-password`,
    payload
  );
  return response.data;
};

export const resetPassword = async ({ payload, token }) => {
  const response = await axios.post(
    `${baseUrl}/api/auth/reset-password?token=${token}`,
    payload
  );
  return response.data;
};
