import { mutation } from "../graphql/mutations/addMember";
import { useGenericMutation } from "@/shared";

export interface AddMemberInput {
  email: string;
  abilities: number[];
}

export const useAddTeamMemberMutation = () => {
  return useGenericMutation<unknown, AddMemberInput>(mutation, {
    refetchQueries: ["Users"],
  });
};
