import { useGenericMutation } from "@/shared";
import { mutation } from "../graphql/mutations/updateUser";

export interface UpdateMemberInput {
  id: number;
  isActive?: boolean;
  name?: string;
  email?: string;
  password?: string;
}

export const useUpdateMemberutation = () => {
  return useGenericMutation<unknown, UpdateMemberInput>(mutation, {
    refetchQueries: ["Users"],
  });
};
