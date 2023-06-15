import { gql } from "@apollo/client";

export const passwordMutation = gql`
  mutation EditUserProfile(
    $name: String!
    $language: String!
    $date_format: String!
  ) {
    EditUserProfileMutation(
      input: { name: $name, language: $language, date_format: $date_format }
    ) {
      id
      name
      email
      profile {
        id
        user
        language
        date_format
        email_notifications
        communications
        Mcultivo_App_updates
      }
    }
  }
`;
