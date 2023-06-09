import { gql } from "@apollo/client";

export const accountTags = gql`
  query accountTags {
    tags {
      id
      name
      color
    }
  }
`;
