import { gql } from "@apollo/client";

export const changeEmailMutation = gql`
  mutation ChangeEmailMutation($newEmail: String!) {
    ChangeEmailMutation(newEmail: $newEmail)
  }
`;
