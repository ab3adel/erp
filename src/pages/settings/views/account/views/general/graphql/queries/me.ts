import { gql } from "@apollo/client";

export const meQuery = gql`
  query Me {
    me {
      id
      name
      email
      profile {
        language
        date_format
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
