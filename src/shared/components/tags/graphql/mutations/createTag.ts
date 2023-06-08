import { gql } from "@apollo/client";

export const createTag = gql`
  mutation CreateOrUpdateTag($name: String, $color: String) {
    createOrUpdateTag(name: $name, color: $color) {
      id
      name
      color
      tenant_id
    }
  }
`;
