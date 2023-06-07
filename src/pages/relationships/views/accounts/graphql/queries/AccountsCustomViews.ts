import { gql } from "@apollo/client";

export const accountsCustomViews = gql`
  query UserViews($id: ID!, $module: String!) {
    views_user(user_id: $id, module: $module) {
      id
      name
      module
      is_shared
      query
      preferences {
        id
        is_closed
        order
      }
    }
  }
`;
