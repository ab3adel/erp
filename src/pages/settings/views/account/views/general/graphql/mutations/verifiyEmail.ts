import { gql } from "@apollo/client";

export const verifiyEmail = gql`
  mutation SendVerificationCodeMutation($code: String!) {
    SendVerificationCodeMutation(code: $code)
  }
`;
