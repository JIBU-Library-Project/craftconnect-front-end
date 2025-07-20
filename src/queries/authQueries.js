import { useMutation } from "@tanstack/react-query";
import { apiLogin, apiSignup } from "../services/auth";

export const useSignUp = () => {
  return useMutation({
    mutationFn: apiSignup,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: apiLogin,
  });
};
