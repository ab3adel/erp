import { gql } from "@apollo/client";

export const lotsQuery = gql`
  query Lots {
    lots {
      data {
        id
        attributes {
          lastUpdate
          state
          name
          weight
          uom
          grade
          location
          subLocation
          processType
        }
      }
    }
  }
`;
