import { gql } from "@apollo/client";

export const accountFarmSpacingUoMs = gql`
  query AccountsFarmSpacingUoMs {
    farmSpacingUoms(first: 100) {
      data {
        id
        name
      }
    }
  }
`;
