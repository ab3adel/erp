import { gql } from "@apollo/client";

export const accountNameSearch = gql`
  query AccountsQuery($filter: AccountFilter) {
    accounts(AccountFilter: $filter) {
      data {
        id
      }
    }
  }
`;
