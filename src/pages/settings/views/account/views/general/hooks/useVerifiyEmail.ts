import { useGenericMutation } from "@/shared";
import { verifiyEmail } from "../graphql/mutations/verifiyEmail";
import { Params } from "../types/verificationCode.types";

export const useVerifiyEmail = () => {
  return useGenericMutation<void, Params>(verifiyEmail, {
    refetchQueries: ["Me"],
  });
};
