import { gql } from "@apollo/client";

export const accountsQuery = gql`
  query AccountsQuery {
    accounts {
      data {
        id 
        attributes {
          name 
          type
          firstName
          lastName
          govrmentId
          mobileNumber
          district
          status
          completeness
        }
      }
    }
  }  
`;
