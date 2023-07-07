import { gql } from "@apollo/client";

export const accountTags = gql`
  query accountTags($type: String!) {
    tags(group: $type) {
        id
        name
        color
        tenant_id
    }
}
`;

