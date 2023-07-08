import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface MergeLotsInput {
  ids: number[];
  name: string;
}

export const useMergeLotsMutation = () => {
  return useMutation<unknown, MergeLotsInput>(mutation, {
    refetchQueries: ["Lots"],
  });
};
