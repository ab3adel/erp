import { gql } from "@apollo/client";

export const ProfileMutation = gql`
  mutation EditUserProfile(
    $name: String
    $language: String
    $date_format: String
    $email_notifications: Boolean
    $password_updates: Boolean
    $security_updates: Boolean
    $communications: Boolean
    $Mcultivo_App_updates: Boolean
  ) {
    EditUserProfileMutation(
      input: {
        name: $name
        language: $language
        date_format: $date_format
        email_notifications: $email_notifications
        password_updates: $password_updates
        security_updates: $security_updates
        communications: $communications
        Mcultivo_App_updates: $Mcultivo_App_updates
      }
    ) {
      profile {
        id
        avatar {
          id
          src
          file_type
          model_type
          zone
        }
        user {
          id
          name
          email
        }
        language
        date_format
        password_updates
        security_updates
        communications
        Mcultivo_App_updates
      }
    }
  }
`;
