import { gql } from "@apollo/client";

export const createView = gql`
  mutation UpsertView(
    $name: String
    $module: String
    $is_shared: Boolean
    $created_by: Int
    $query: String
  ) {
    UpsertView(
      name: $name
      module: $module
      is_shared: $is_shared
      created_by: $created_by
      query: $query
    ) {
      id
      name
      module
      is_shared
      query
    }
  }
`;
