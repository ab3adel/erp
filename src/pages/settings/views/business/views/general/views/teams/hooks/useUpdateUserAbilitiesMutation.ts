import { useGenericMutation } from "@/shared";
import { mutation } from "../graphql/mutations/updateUserAbilities";

export interface UpdateMemberAbilitiesVariables {
  memberId: number;
  abilityIds: number[];
}
export const useUpdateUserAbilities = () => {
  return useGenericMutation<unknown, UpdateMemberAbilitiesVariables>(mutation, {
    refetchQueries: ["Users", "User"],
  });
};
