import { gql } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $status: String!) {
    updateLotStatus(id: $id, status: $status)
  }
`;
