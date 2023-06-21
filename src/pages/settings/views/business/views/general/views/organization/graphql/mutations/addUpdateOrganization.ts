import { gql } from "@apollo/client";

export const mutation = gql`
  mutation (
    $id: Int
    $companyName: String
    $teamMembers: Int
    $countryId: Int
    $cityId: Int
    $languageId: Int
    $planId: Int
    $currencyId: Int
    $address1: String
    $color: String
    $address2: String
  ) {
    updateOrInsertOrganization(
      input: {
        id: $id
        company_name: $companyName
        team_members: $teamMembers
        country_id: $countryId
        city_id: $cityId
        language_id: $languageId
        plan_id: $planId
        currency_id: $currencyId
        address_1: $address1
        color: $color
        address_2: $address2
      }
    ) {
      id
    }
  }
`;
