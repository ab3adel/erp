import { gql } from "@apollo/client";

export const accountProfile = gql`
  query accountProfile($id: ID!) {
    account(id: $id) {
      id
      name
      category
      completeness
      status
      subscription_type
      address1
      address2
      city
      country {
        id
        name
      }
      currency {
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
      accountType {
        id
        name
        category
      }
      farms {
        id
        average_tree_age
        farm_name
        size
        spacing
        varietal {
          id
          name
        }
      }

      tags {
        id
        name
        color
      }
      contacts {
        id
        type
        contact_info
        is_primary
      }
      notes {
        id
        note_title
        note_body
        created_at
      }
    }
  }
`;
