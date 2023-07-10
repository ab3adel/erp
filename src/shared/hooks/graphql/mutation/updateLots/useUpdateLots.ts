import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface UpdateLotInput {
  id: number;
  account_id: number;
  grade: string;
  uom: number;
  weight: number;
  commission_uom: number;
  name: string;
  cupping_score: string;
  coffee_state: string;
  reception_date: string;
  is_paid: boolean;
  currency_id: number;
}

export const useUpdateLotMutation = () => {
  return useMutation<unknown, { input: Partial<UpdateLotInput> }>(mutation, {
    refetchQueries: ["Lots"],
  });
};
