import { gql } from "@apollo/client";

export const removeReceiption = gql`
  mutation removeReceiption($id: ID!) {
    deleteReception(id: $id) {
      __typename
    }
  }
`;
