import { gql } from "@apollo/client";

export const mutation = gql`
  mutation (
    $id: ID!
    $isActive: Boolean
    $name: String
    $email: String
    $password: String
  ) {
    updateUser(
      id: $id
      input: {
        is_active: $isActive
        name: $name
        email: $email
        password: $password
      }
    ) {
      id
      name
    }
  }
`;
