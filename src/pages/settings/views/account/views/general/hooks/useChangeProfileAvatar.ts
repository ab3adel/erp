import { ProfileMutation } from "../graphql/mutations/profileAvatar";
import { Params } from "../types/avatar.types";
import { useMutation } from "@apollo/client";

export const useChangeProfileAvatar = () => {
  return useMutation<void, Params>(ProfileMutation, {
    refetchQueries: ["Me"],
  });
};
