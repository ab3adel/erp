import { gql } from "@apollo/client";

export const teamMembers = gql`
  {
    users {
      data {
        id
        name
        email
        # modules # comma seperated
        role
        abilities {
          id
          title
        }
      }
    }
  }
`;
