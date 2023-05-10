import { gql } from "@apollo/client";

export const saveAccount = gql`
  mutation saveAccount($data: AccountInput!) {
    createAccount(data: $data) {
      __typename
    }
  }
`;
