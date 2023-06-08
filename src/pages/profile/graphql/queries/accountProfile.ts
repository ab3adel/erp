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
      country
      currency
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
        varietals
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
    }
  }
`;
