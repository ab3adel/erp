import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface DeletePendingLotsInput {
  lotIds: number[];
}

export interface Response {
  DeletePendingLots: number;
}

export const useDeletePendingLotsMutation = () => {
  return useMutation<Response, DeletePendingLotsInput>(mutation, {
    refetchQueries: [],
  });
};
