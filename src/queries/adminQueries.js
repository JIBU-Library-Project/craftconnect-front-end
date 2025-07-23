import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSingleUser,
  getAllUsers,
  deleteUser,
  deleteArtisan,
  getVerificationRequests,
  modifyVerificationRequest,
  getSingleVerification,
} from "../services/admin";

export const useGetSingleUser = (id) => {
  return useQuery({
    queryKey: ["singleUser", id],
    queryFn: () => getSingleUser(id),
    enabled: !!id,
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
    },
  });
};

export const useDeleteArtisan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteArtisan,
    onSuccess: () => {
      queryClient.invalidateQueries(["allArtisans"]);
    },
  });
};

export const useGetVerificationRequests = () => {
  return useQuery({
    queryKey: ["verificationRequests"],
    queryFn: getVerificationRequests,
  });
};

// New One
export const useGetSingleVerification = (id) => {
  return useQuery({
    queryKey: ["verficiationRequests", id],
    queryFn: () => getSingleVerification(id),
    enabled: !!id,
  });
};

export const useModifyVerificationRequest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => modifyVerificationRequest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["verificationRequests"]);
    },
  });
};
