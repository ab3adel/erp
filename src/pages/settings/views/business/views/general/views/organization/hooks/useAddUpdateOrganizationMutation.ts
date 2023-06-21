import { useGenericMutation } from "@/shared";
import { mutation } from "../graphql/mutations/addUpdateOrganization";

interface UpdateOrInsertOrganizationMutationVariables {
  id?: number;
  companyName?: string;
  teamMembers?: number;
  countryId?: number;
  cityId?: number;
  languageId?: number;
  planId?: number;
  currencyId?: number;
  address1?: string;
  color?: string;
  address2?: string;
}

export const useAddUpdateOrganizationMutation = () => {
  return useGenericMutation<
    unknown,
    UpdateOrInsertOrganizationMutationVariables
  >(mutation, { refetchQueries: ["Organization"] });
};
