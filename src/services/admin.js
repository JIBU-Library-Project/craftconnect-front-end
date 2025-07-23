import { apiClient } from "./config";

export const getSingleUser = async (id) => {
  const response = await apiClient.get(`/api/admin/users/${id}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await apiClient.get("/api/admin/users");
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/api/admin/users/${id}`);
  return response.data;
};

export const deleteArtisan = async (id) => {
  const response = await apiClient.delete(`/api/admin/artisans/${id}`);
  return response.data;
};

export const getVerificationRequests = async () => {
  const response = await apiClient.get("/api/admin/verify-requests");
  return response.data;
};

export const getSingleVerification = async (id) => {
  const response = await apiClient.get(`/api/admin/verify-requests/${id}`);
  return response.data;
};

export const modifyVerificationRequest = async (id, payload) => {
  const response = await apiClient.patch(
    `/api/admin/verify-requests/${id}`,
    payload
  );
  return response.data;
};
