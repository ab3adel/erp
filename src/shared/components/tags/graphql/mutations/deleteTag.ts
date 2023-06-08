import { gql } from "@apollo/client";

export const deleteTag = gql`
  mutation deleteTag($id: Int!) {
    deleteTag(id: $id) {
      id
    }
  }
`;
