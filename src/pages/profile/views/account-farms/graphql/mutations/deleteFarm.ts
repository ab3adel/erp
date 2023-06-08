import { gql } from "@apollo/client";

export const deleteFarm = gql`
  mutation DeleteFarm($id: Int!) {
    deleteFarm(id: $id) {
      id
    }
  }
`;
