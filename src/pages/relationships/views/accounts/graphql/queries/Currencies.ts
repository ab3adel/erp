import { gql } from "@apollo/client";

export const currenciesQuery = gql`
  query Currencies {
    currencies(first: 1000) {
      data {
        id
        name
      }
    }
  }
`;
