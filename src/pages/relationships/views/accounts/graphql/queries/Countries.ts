import { gql } from "@apollo/client";

export const countriesQuery = gql`
  query Countries {
    countries(first: 1000) {
      data {
        id
        name
      }
    }
  }
`;
