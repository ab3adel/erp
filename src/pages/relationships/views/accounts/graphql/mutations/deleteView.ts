import { gql } from "@apollo/client";

export const deleteView = gql`
  mutation DeleteView($id: ID!) {
    deleteView(id: $id) {
      id
    }
  }
`;
