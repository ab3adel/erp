import { gql } from "@apollo/client";

export const mutation = gql`
  mutation ($input: LotInput!) {
    updateLot(input: $input) {
      id
    }
  }
`;
