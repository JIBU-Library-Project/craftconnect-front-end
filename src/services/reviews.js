import { apiClient } from "./config";

export const postReviews = async (payload) => {
  const response = await apiClient.post("/api/review", payload);
  return response.data;
};

export const getReviews = async () => {
  const response = await apiClient.get("/api/reviews");
  return response.data;
};

export const getSingleReview = async (id) => {
  const response = await apiClient.get(`/api/reviews/${id}`);
  return response.data;
};
