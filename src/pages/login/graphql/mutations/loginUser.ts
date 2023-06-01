import { gql } from "@apollo/client";

export const loginUser = gql`
  mutation ($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
    }
  }
`;
