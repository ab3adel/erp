import { gql } from "@apollo/client";

export const meQuery = gql`
  query Me {
    me {
      id
      name
      email
      role
      profile {
        language
        date_format
        email_notifications
        password_updates
        security_updates
        communications
        Mcultivo_App_updates

        avatar {
          src
          file_type
          model_type
          zone
        }
      }
    }
  }
`;
