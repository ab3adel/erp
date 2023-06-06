import { gql } from "@apollo/client";

export const deleteAccount = gql`
  mutation removeAccount($id: Int!) {
    deleteAccount(id: $id) {
      id
    }
  }
`;
