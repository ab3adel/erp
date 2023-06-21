import { gql } from "@apollo/client";

export const UserProfileQuery = gql`
  query myProfile {
    me {
      id
    }
  }
`;
