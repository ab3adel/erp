import { mutation } from "../graphql/mutations/deleteUser";
import { useGenericMutation } from "@/shared";

export interface DeleteMemberInput {
  id: number;
}

export const useDeleteUserMutation = () => {
  return useGenericMutation<unknown, DeleteMemberInput>(mutation, {
    refetchQueries: ["Users"],
  });
};
