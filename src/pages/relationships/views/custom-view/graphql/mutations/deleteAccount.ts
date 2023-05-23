import { gql } from "@apollo/client";

export const deleteAccount = gql`
  mutation removeAccount($id: ID!) {
    deleteAccount(id: $id) {
      __typename
    }
  }
`;
