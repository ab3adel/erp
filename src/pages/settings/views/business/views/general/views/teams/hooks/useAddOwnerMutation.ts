import { mutation } from "../graphql/mutations/addOwner";
import { useGenericMutation } from "@/shared";

export interface AddOwnerInput {
  email: string;
}

export const useAddOwnerMutation = () => {
  return useGenericMutation<unknown, AddOwnerInput>(mutation, {
    refetchQueries: ["Users"],
  });
};
