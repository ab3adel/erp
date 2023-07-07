import { gql } from "@apollo/client";

export const mutation = gql`
  mutation ($lotIds: [ID!]!) {
    DeletePendingLots(ids: $lotIds)
  }
`;
