import { useQuery } from "@apollo/client";
import { DataGridRow, Response } from "../types";
import { useMemo } from "react";
import { receptions } from "../graphql/queries/receptions";

export const useReceiptionsTableRows = (): {
  rows: DataGridRow[];
  loading: boolean;
} => {
  const { data, loading } = useQuery<Response>(receptions);
  const rows: DataGridRow[] = useMemo(() => {
    return (
      data?.lots?.data?.map?.((lot) => ({
        id: lot.id,
        receptionDate: lot.reception_date ? new Date(lot.reception_date) : new Date(),
        status: lot.status,
        accountId: lot.account.id,
        accountName: lot.account.name,
        lotNumber: '',
        grade: lot.grade,
        weight: lot.weight,
        totalCost: lot.total_price,
        payment: lot.is_paid,
        commission: lot.commission_uom,
        uom: lot.cost_per_uom,
        cherry_price: lot.cherry_price,
        currency_fixed: lot.currency.name,
      })) || []
    );
  }, [data]);

  return { rows, loading };
};
