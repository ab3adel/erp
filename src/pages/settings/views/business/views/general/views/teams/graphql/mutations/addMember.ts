import { gql } from "@apollo/client";

export const mutation = gql`
  mutation AddMember($email: String!, $abilities: [Int!]!) {
    addMember(input: { email: $email, abilities: $abilities }) {
      id
      name
    }
  }
`;
