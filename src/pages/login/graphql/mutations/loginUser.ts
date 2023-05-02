import { gql } from "@apollo/client";

export const loginUser = gql`
  mutation ($email: String!, $password: String!) {
    login(input: { identifier: $email, password: $password }) {
      jwt
    }
  }
`;
