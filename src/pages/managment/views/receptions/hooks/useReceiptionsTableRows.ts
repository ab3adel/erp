import { useQuery } from "@apollo/client";
import { DataGridRow, Response } from "../types";
import { useMemo } from "react";
import { query as receptions } from "@/shared/hooks/graphql/queries/useLots/query";
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
      first: filterModel ? undefined : paginationModel.pageSize,
      page: filterModel ? undefined : paginationModel.page + 1,
      ...(filterModel && {
        filter: filterModel?.items.reduce((acc, item) => {
          return {
            ...acc,
            [item.field]:
              (Number(item.value) || Number(item.value) === 0) && (item.field !== 'lot_number' && item.field !== 'account_id')
                ? { min: Number(item.value), max: Number(item.value) }
                : item.field === "account_id" ? Number(item.value) : item.field === 'is_paid' ? item.value === 'true' : item.value,
            ...(typeId && { type_id: typeId }),
          };
        }, {}),
      }),
    },
  });

  const rows: DataGridRow[] = useMemo(() => {
    return (
      data?.lots?.data?.map?.((lot) => ({
        id: Number(lot?.id),
        reception_date: lot.reception_date,
        status: lot.status,
        account_id: lot.account?.id,
        account_name: lot.account?.name,
        grade: lot.grade,
        weight: lot.weight,
        total_price: lot.total_price,
        is_paid: lot.is_paid,
        commission_uom: lot.commission_uom,
        cost_per_uom: lot.cost_per_uom,
        cherry_price: lot.cherry_price,
        currency_fixed: lot.currency?.name,
        tags: lot.tags,
        lot_number: lot.lot_number,
      })) || []
    );
  }, [data]);

  const paginatorInfo = data?.lots.paginatorInfo || null;

  return { rows, loading, paginatorInfo };
};
