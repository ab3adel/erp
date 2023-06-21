import { gql } from "@apollo/client";

export const teamMembers = gql`
  query Users($first: Int, $page: Int) {
    users(first: $first, page: $page) {
      data {
        id
        name
        email
        is_active
        modules
        role
        abilities {
          id
          title
        }
      }
    }
  }
`;
