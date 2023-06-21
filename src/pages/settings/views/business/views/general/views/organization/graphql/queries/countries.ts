import { gql } from "@apollo/client";

export const query = gql`
  query ($first: Int!) {
    countries(first: $first) {
      data {
        id
        name
        languages {
          id
          name
        }
        currencies {
          id
          name
        }
        cities {
          id
          name
        }
      }
    }
  }
`;
