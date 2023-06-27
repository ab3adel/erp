import { gql } from "@apollo/client";

export const accountFarmSizeUoMs = gql`
  query farmSizeUoMs {
    farmSizeUoms(first: 100) {
      data {
        id
        name
      }
    }
  }
`;
