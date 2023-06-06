import { gql } from "@apollo/client";

export const saveFarm = gql`
  mutation SaveFarm($farms: [FarmInput!], $id: Int!) {
    updateOrInsertAccount(input: { farms: $farms, id: $id }) {
      created_at
      updated_at
      id
    }
  }
`;
