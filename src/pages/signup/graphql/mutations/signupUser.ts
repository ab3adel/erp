import { gql } from "@apollo/client";

export const signupUser = gql`
  mutation ($email: String!, $password: String!) {
    register(input: { username: $email, email: $email, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
