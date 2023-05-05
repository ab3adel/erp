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
      data?.receptions?.data?.map?.((reception) => ({
        id: reception.id,
        receptionDate: new Date(reception.attributes.date),
        status: reception.attributes.status,
        accountId: reception.attributes.account.data.id,
        accountName: reception.attributes.account.data.attributes.name,
        lotNumber: reception.attributes.lot.data?.attributes?.number,
        grade: reception.attributes.lot.data?.attributes?.grade,
        weight: reception.attributes.lot.data?.attributes?.weight,
        totalCost: reception.attributes.totalCost,
        payment: reception.attributes.payment,
        commission: reception.attributes.comission,
        uom: reception.attributes.lot.data?.attributes?.uom,
        cherry_price: reception.attributes.cherryPrice,
        currency_fixed: reception.attributes.currecnyFixed,
      })) || []
    );
  }, [data]);

  return { rows, loading };
};
