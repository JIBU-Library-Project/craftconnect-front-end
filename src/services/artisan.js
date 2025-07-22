import { apiClient } from "./config";

export const getPersonalProfile = async () => {
  const response = await apiClient.get("/api/artisans/me");
  return response.data;
};

// export const updateArtisanProfile = async (payload) => {
//   const response = await apiClient.patch("/api/artisans/me", payload);
//   return response.data;
// };

// export const postArtisanPortfolio = async (payload) => {
//   const response = await apiClient.post("/api/artisans/portfolio", payload);
//   return response.data;
// };

export const getAllArtisans = async () => {
  const response = await apiClient.get("/api/artisans");
  return response.data;
};

export const getSingleArtisan = async (id) => {
  const response = await apiClient.get(`/api/artisans/${id}`);
  return response.data;
};

export const verifyRequest = async (payload) => {
  const response = await apiClient.post(
    "/api/artisans/verify-request",
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const updateArtisanProfile = async (payload) => {
  console.log("Updating profile with:", payload);
  const response = await apiClient.patch("/api/artisans/me", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const postArtisanPortfolio = async (payload) => {
  console.log("Posting portfolio with:", payload);
  const response = await apiClient.post("/api/artisans/portfolio", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
