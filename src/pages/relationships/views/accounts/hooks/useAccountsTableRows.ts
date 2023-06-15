import { useQuery } from "@apollo/client";
import { accountsQuery } from "../graphql/queries/AccountsQuery";
import { AccountsResponse } from "../types";
import { useMemo } from "react";
import { GridFilterModel, GridPaginationModel } from "@mui/x-data-grid-pro";
import { Account } from "@/shared/models/models";

export const useAccountsTableRows = (
  paginationModel: GridPaginationModel,
  filterModel?: GridFilterModel
) => {
  const { data, loading } = useQuery<AccountsResponse>(accountsQuery, {
    variables: {
      first: paginationModel.pageSize,
      page: paginationModel.page + 1,
      filter: filterModel?.items.reduce((acc, item) => {
        return {
          ...acc,
          [item.field]: Number(item.value)
            ? { min: Number(item.value), max: Number(item.value) }
            : item.value,
        };
      }, {}),
    },
  });

  const rows = useMemo(() => {
    const rows: Account[] = data?.accounts.data || [];
    return rows;
  }, [data]);

  const paginationInfo = data?.accounts.paginatorInfo;

  return { rows, loading, paginationInfo };
};
