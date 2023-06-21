import { gql } from "@apollo/client";

export const query = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      is_active
      modules
      abilities {
        id
        title
      }
    }
  }
`;
