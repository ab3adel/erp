import { gql } from "@apollo/client";

export const saveReceiption = gql`
mutation saveReceiption($data: ReceptionInput!) {
    createReception(data: $data) {
      __typename
    }
  }  
`