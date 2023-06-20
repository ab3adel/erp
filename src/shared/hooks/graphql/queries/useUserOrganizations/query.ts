import { gql } from "@apollo/client";

export const query = gql`
  query {
    userOrganizations {
      data {
        id
        tenant {
          id
        }
        company_name
        country {
          id
          name
        }
        city {
          id
          name
        }
        language {
          id
          name
        }

        currency {
          id
          name
        }

        plan {
          id
          name
        }
        team_members
        address_1
        address_2
        color
        created_at
        updated_at
      }
    }
  }
`;
