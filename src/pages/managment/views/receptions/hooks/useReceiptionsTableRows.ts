import { useQuery } from "@apollo/client";
import { DataGridRow, Response } from "../types";
import { useMemo } from "react";
import { receptions } from "../graphql/queries/receptions";
import { PaginatorInfo } from "@/shared/models/models";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid-pro";

export const useReceiptionsTableRows = (
  paginationModel: GridPaginationModel,
  filterModel?: GridFilterModel,
  typeId?: number
): {
  rows: DataGridRow[];
  loading: boolean;
  paginatorInfo: PaginatorInfo | null;
} => {
  const { data, loading } = useQuery<Response>(receptions, {
    variables: {
      first: paginationModel.pageSize,
      page: paginationModel.page + 1,
      ...(filterModel && {
        filter: filterModel?.items.reduce((acc, item) => {
          return {
            ...acc,
            [item.field]: Number(item.value)
              ? { min: Number(item.value), max: Number(item.value) }
              : "%" + item.value + "%",
            ...(typeId && { type_id: typeId }),
          };
        }, {}),
      }),
    },
  });

  const rows: DataGridRow[] = useMemo(() => {
    return (
      data?.lots?.data?.map?.((lot) => ({
        id: lot.id,
        receptionDate: lot.reception_date ? new Date(lot.reception_date) : new Date(),
        status: lot.status,
        accountId: lot.account.id,
        accountName: lot.account.name,
        lotNumber: lot.uuid,
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

  const paginatorInfo = data?.lots.paginatorInfo || null

  return { rows, loading, paginatorInfo };
};
