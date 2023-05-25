import { useQuery } from "@apollo/client";
import { accountsQuery } from "../graphql/queries/AccountsQuery";
import { AccountsResponse } from "../types";
import { useMemo } from "react";
export const useAccountsTableRows = () => {
  const { data, loading } = useQuery<AccountsResponse>(accountsQuery);
  const rows = useMemo(
    () =>
      data?.accounts.data.map((account) => ({
        id: account.id,
        name: account.attributes.name,
        type: account.attributes.type,
        firstName: account.attributes.firstName,
        lastName: account.attributes.lastName,
        govId: account.attributes.govId,
        mobileNumber: account.attributes.mobileNumber,
        district: account.attributes.district,
        status: account.attributes.status,
        completeness: account.attributes.completeness,
      })) || [],
    [data]
  );
  return { rows, loading };
};
