import { passwordMutation } from "../graphql/mutation/password";
import { Data, Params } from "../types/password.types";
import { useGenericMutation } from "@/shared";

export const usePasswordChangeMutation = () => {
  return useGenericMutation<Data, Params>(passwordMutation);
};
