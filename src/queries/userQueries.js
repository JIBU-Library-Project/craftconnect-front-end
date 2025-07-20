import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editUserProfile, getUserProfile } from "../services/user";

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });
};

export const useEditUserProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["userProfile"]);
    },
  });
};
