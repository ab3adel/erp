import { gql } from "@apollo/client";

export const mutation = gql`
  mutation UpdateLotsStatus($ids: [ID!]!, $status: String!) {
    UpdateLotsStatus(ids: $ids, status: $status) {
      id
    }
  }
`;
