import { gql } from "@apollo/client";

export const accountsCustomViews = gql`
  query UserViews($module: String!) {
    views_user(module: $module) {
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
