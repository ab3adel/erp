import { gql } from "@apollo/client";

export const remvoeTagRelation = gql`
  mutation removeTagRelation($ids: [Int!]!, $accountId: Int!) {
    RemoveRelationFromAccount(
      relationname: "tags"
      relationsids: $ids
      account_id: $accountId
    )
  }
`;
