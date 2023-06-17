import { gql } from "@apollo/client";

export const ProfileMutation = gql`
  mutation ($avatar: String!) {
    UploadProfileAvatar(avatar: $avatar)
  }
`;
