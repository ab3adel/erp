import { gql } from "@apollo/client";

export const passwordMutation = gql`
  mutation UpdatePassword(
    $current_password: String!
    $password: String!
    $password_confirmation: String!
  ) {
    updatePassword(
      input: {
        current_password: $current_password
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
    }
  }
`;
