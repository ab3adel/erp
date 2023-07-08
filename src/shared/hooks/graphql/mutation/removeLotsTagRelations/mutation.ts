import { gql } from "@apollo/client";

export const mutation = gql`
  mutation removeTagRelation($ids: [Int!]!, $lotId: Int!) {
    RemoveRelationFromLot(
      relationName: "tags"
      relationsIds: $ids
      Lot_id: $lotId
    )
  }
`;
