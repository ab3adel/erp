import { gql } from "@apollo/client";

export const accountsQuery = gql`
  query AccountsQuery($first: Int!, $page: Int!, $filter: AccountFilter) {
    accounts(first: $first, page: $page, AccountFilter: $filter) {
      data {
        id
        name
        category
        completeness
        status
        tags {
          id
          name
          color
        }
        subscription_type
        address1
        address2
        city
        country {
          id
          name
        }
        farmSizeUom {
          name
          id
        }
        farmSpacingUom {
          id
          name
        }
        district
        government_id
        region
        zone
        state
        
        date_of_birth
        education_level
        first_name
        last_name
        gender
        marital_status
        members_in_household
        read_literate
        write_literate
        total_children
        created_at
        updated_at
        currency {
          id
          name
        }
        accountType {
          id
          name
          category
          created_at
          updated_at
        }
        contacts {
          id
          contact_info
          type
          is_primary
        }
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
    }
  }
`;
