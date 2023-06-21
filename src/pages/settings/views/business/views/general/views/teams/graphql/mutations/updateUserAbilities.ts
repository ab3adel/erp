import { gql } from "@apollo/client";

export const mutation = gql`
  mutation UpdateMemberAbilities($memberId: ID!, $abilityIds: [Int!]!) {
    updateMemberAbilities(input: { id: $memberId, abilities: $abilityIds }) {
      id
      name
    }
  }
`;
