import { gql } from "@apollo/client";

export const createTag = gql`
  mutation CreateOrUpdateTag($name: String, $color: String, $group: String!) {
    createOrUpdateTag(name: $name, color: $color, group: $group) {
      id
      name
      color
      tenant_id
    }
  }
`;
