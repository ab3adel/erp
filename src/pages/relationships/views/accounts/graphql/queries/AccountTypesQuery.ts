import { gql } from "@apollo/client";

export const accountTypes = gql`
  query AccountTypes {
    accountTypes {
      data {
        category
        name
        id
      }
    }
  }
`;
