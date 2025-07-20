import { useMutation } from "@tanstack/react-query";
import {
  apiLogin,
  apiSignup,
  forgotPassword,
  resetPassword,
} from "../services/auth";

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

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};
