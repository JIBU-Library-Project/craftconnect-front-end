import { apiClient } from "./config";

export const getUserProfile = async () => {
  const response = await apiClient.get("/api/users/me");
  return response.data;
};

export const editUserProfile = async (payload) => {
  console.log("Updatin profile with:", payload);
  const response = await apiClient.patch("/api/users/me", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
