import { apiClient } from "./config";

export const getUserProfile = async () => {
  const response = await apiClient.get("/api/users/me");
  return response.data;
};

export const editUserProfile = async (payload) => {
  const response = await apiClient.patch("/api/users/me", payload);
  return response.data;
};
