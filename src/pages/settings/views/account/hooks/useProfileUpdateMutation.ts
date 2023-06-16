import { ProfileMutation } from "../graphql/mutations/profile";
import { Data, Params } from "../types/profile.types";
import { useGenericMutation } from "@/shared";

export const useProfileUpdateMutation = () => {
  return useGenericMutation<Data, Params>(ProfileMutation, {
    refetchQueries: ["Me"],
  });
};
