import { gql } from "@apollo/client";

export const accountsQuery = gql`
  query AccountsQuery($first: Int!, $page: Int!) {
    accounts(first: $first, page: $page) {
      data {
        id
        name
        category
        completeness
        status
        tags {
          name
          color
          id
        }
        subscription_type
        address1
        address2
        city
        country
        district
        government_id
        language
        region
        zone
        state
        unit_of_measurement
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
        accountType {
          id
          name
          category
          created_at
          updated_at
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
