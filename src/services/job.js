import { apiClient } from "./config";

export const postJobs = async (payload) => {
  const response = await apiClient.post("/api/jobs", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
