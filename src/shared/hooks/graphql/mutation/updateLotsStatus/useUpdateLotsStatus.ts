import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface UpdateLotsStatusInput {
  ids: number[];
  status: "pending" | "approved" | "inactive";
}

export const useUpdateLotsStatusMutation = () => {
  return useMutation<unknown, UpdateLotsStatusInput>(mutation, {
    refetchQueries: [],
  });
};
