import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface UpdateLotStatusInput {
  id: number;
  status: "pending" | "approved" | "inactive";
}

export const useUpdateLotStatusMutation = () => {
  return useMutation<unknown, UpdateLotStatusInput>(mutation, {
    refetchQueries: ["Lots"],
  });
};
