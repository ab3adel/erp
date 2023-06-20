import { gql } from "@apollo/client";

export const teamMembers = gql`
  query Users($first: Int, $page: Int) {
    users(first: $first, page: $page) {
      data {
        id
        name
        email
        # modules
        role
        abilities {
          id
          title
        }
      }
    }
  }
`;
