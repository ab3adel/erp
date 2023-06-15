import { useMutation } from "@apollo/client";
import { passwordMutation } from "../../security/graphql/mutation/password";
import { Data, Params } from "../types/profile.types";

export const useProfileUpdateMutation = () => {
  return useMutation<Data, Params>(passwordMutation);
};
