import { useQuery } from "@apollo/client";
import { accountsQuery } from "../graphql/queries/AccountsQuery";
import { AccountsResponse } from "../types";
import { useMemo } from "react";
import { GridPaginationModel } from "@mui/x-data-grid-pro";
import { Account } from "@/shared/models/models";

export const useAccountsTableRows = (paginationModel: GridPaginationModel) => {
  const { data, loading } = useQuery<AccountsResponse>(accountsQuery, {
    variables: {
      first: paginationModel.pageSize,
      page: paginationModel.page + 1,
    },
  });

  const rows = useMemo(() => {
    const rows: Account[] = data?.accounts.data || [];
    return rows;
  }, [data]);

  const paginationInfo = data?.accounts.paginatorInfo;

  return { rows, loading, paginationInfo };
};
