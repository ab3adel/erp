import { useGenericMutation } from "@/shared";
import { mutation } from "../graphql/mutations/updateUser";
import { GeneralOptions } from "@/shared/hooks/useGenericMutation";

export interface UpdateMemberInput {
  id: number;
  isActive?: boolean;
  name?: string;
  email?: string;
  password?: string;
}

export const useUpdateMemberutation = (generalOptions?: GeneralOptions) => {
  return useGenericMutation<unknown, UpdateMemberInput>(
    mutation,
    {
      refetchQueries: ["Users", "GetUser"],
    },
    generalOptions
  );
};
