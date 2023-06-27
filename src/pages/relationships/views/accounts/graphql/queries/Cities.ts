import { gql } from "@apollo/client";

export const citiesQuery = gql`
  query Cities {
    cities(first: 1000) {
      data {
        id
        name
      }
    }
  }
`;
