import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postJobs } from "../services/job";

export const usePostJobs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postJobs,
    onSuccess: () => {
      queryClient.invalidateQueries(["jobs"]);
    },
  });
};
