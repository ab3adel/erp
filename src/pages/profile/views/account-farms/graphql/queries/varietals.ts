import { gql } from "@apollo/client";

export const query = gql`
  query GetVarietals($first: Int, $page: Int) {
    varietals(first: $first, page: $page) {
      data {
        id
        name
      }
    }
  }
`;
