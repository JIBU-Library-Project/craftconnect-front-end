import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllArtisans,
  getArtisanJobs,
  getArtisansReviews,
  getPersonalProfile,
  getSingleArtisan,
  postArtisanPortfolio,
  updateArtisanProfile,
  verifyRequest,
} from "../services/artisan";

export const useGetPersonalProfile = () => {
  return useQuery({
    queryKey: ["personalProfile"],
    queryFn: getPersonalProfile,
  });
};

export const useUpdateArtisanProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateArtisanProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["personalProfile"]);
    },
  });
};

export const usePostArtisanPortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postArtisanPortfolio,
    onSuccess: () => {
      queryClient.invalidateQueries(["personalProfile"]);
    },
  });
};

export const useGetAllArtisans = () => {
  return useQuery({
    queryKey: ["allArtisans"],
    queryFn: getAllArtisans,
  });
};

export const useGetSingleArtisan = (id) => {
  return useQuery({
    queryKey: ["singleArtisan", id],
    queryFn: () => getSingleArtisan(id),
    enabled: !!id,
  });
};

export const useVerifyRequest = () => {
  return useMutation({
    mutationFn: verifyRequest,
  });
};

// New one
export const useGetArtisanJobs = () => {
  return useQuery({
    queryKey: ["artisanJobs"],
    queryFn: getArtisanJobs,
  });
};

// New one
export const useGetArtisanReviews = () => {
  return useQuery({
    queryKey: ["artisanReviews"],
    queryFn: getArtisansReviews,
  });
};
