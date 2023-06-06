import { gql } from "@apollo/client";

export const accountNameSearch = gql`
  query AccountsQuery($name: String) {
    accounts(name: $name) {
      data {
        id
      }
    }
  }
`;
