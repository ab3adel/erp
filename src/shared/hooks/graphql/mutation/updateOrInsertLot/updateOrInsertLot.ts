import { useMutation } from "@apollo/client";
import { mutation } from "./mutation";

export interface UpdateOrInsertLotInput {
  input: {
    id?: number;
    account_id?: number;
    uuid?: string;
    status?: string;
    grade?: string;
    uom?: string;
    weight?: number;
    commission_uom?: number;
    name?: string;
    cupping_score?: string;
    coffee_state?: string;
    reception_date?: string;
    received_to?: number;
    cost_per_uom?: number;
    currency_id?: number;
    is_paid?: boolean;
    is_combined?: boolean;
    certification?: string;
    tags?: TagsInput[];
  };
}

interface TagsInput {
  id: number;
  name: string;
  color: string;
  group: string;
}

export const useUpdateOrInsertLotMutation = () => {
  return useMutation<unknown, UpdateOrInsertLotInput>(mutation, {
    refetchQueries: ["Lots"],
  });
};
