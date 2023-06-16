import { useGenericMutation } from "@/shared";
import { changeEmailMutation } from "../graphql/mutations/changeEmail";
import { Params } from "../types/email.types";

export const useChangeEmail = () => {
  return useGenericMutation<void, Params>(changeEmailMutation);
};
