import { gql } from "@apollo/client";

export const accountsNames = gql`
  query accountsName {
    accounts {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
