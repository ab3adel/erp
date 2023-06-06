import { gql } from "@apollo/client";

export const saveAccount = gql`
  mutation UpdateOrInsertAccount($input: AccountInput!) {
    updateOrInsertAccount(input: $input) {
      id
      name
      category
    }
  }
`;
