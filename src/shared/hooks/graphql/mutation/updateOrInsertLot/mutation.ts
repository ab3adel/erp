import { gql } from "@apollo/client";

export const mutation = gql`
  mutation UpdateOrInsertLot($input: LotInput!) {
    updateOrInsertLot(input: $input) {
      id
    }
  }
`;
