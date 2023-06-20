import { gql } from "@apollo/client";

export const mutation = gql`
  mutation ($email: String!) {
    addOwner(input: { email: $email }) {
      id
      name
    }
  }
`;
