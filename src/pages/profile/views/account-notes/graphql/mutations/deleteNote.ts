import { gql } from "@apollo/client";

export const deleteNote = gql`
  mutation deleteAccountNote($id: Int!) {
    deleteAccountNote(id: $id) {
      id
    }
  }
`;
