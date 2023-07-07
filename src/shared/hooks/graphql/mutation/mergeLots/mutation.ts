import { gql } from "@apollo/client";

export const mutation = gql`
  mutation MergePendingLots($ids: [ID!]!, $name: String!) {
    MergePendingLots(ids: $ids, name: $name) {
      id
    }
  }
`;
