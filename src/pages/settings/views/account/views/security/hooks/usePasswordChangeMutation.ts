import { useMutation } from "@apollo/client";
import { passwordMutation } from "../graphql/mutation/password";
import { Data, Params } from "../types/password.types";

export const usePasswordChangeMutation = () => {
  return useMutation<Data, Params>(passwordMutation, {
    errorPolicy: "all",
  });
};
