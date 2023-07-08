import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface RemoveLotsTagsRelationInput {
  ids: number[];
  lotId: number;
}

export const useRemoveLotsTagsRelationMutation = () => {
  return useMutation<unknown, RemoveLotsTagsRelationInput>(mutation, {
    refetchQueries: ["Lots"],
  });
};
