import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReviews, getSingleReview, postReviews } from "../services/reviews";

export const usePostReviews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReviews,
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
  });
};

export const useGetReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
};

export const useGetReview = (id) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: getSingleReview(id),
    enabled: !!id,
  });
};
