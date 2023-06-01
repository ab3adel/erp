import { useQuery } from "@apollo/client";
import { accountsQuery } from "../graphql/queries/AccountsQuery";
import { AccountRow, AccountsResponse } from "../types";
import { useMemo } from "react";

export const useAccountsTableRows = () => {
  const { data, loading } = useQuery<AccountsResponse>(accountsQuery);
  const rows = useMemo(
    (): AccountRow[] =>
      data?.accounts.data.map((account) => ({
        id: account.id,
        name: account.name,
        category: account.category,
        completeness: account.completeness,
        status: account.status,
        tags: account.tags,
        subscription_type: account.subscription_type,
        address1: account.address1,
        address2: account.address2,
        city: account.city,
        country: account.country,
        district: account.district,
        government_id: account.government_id,
        language: account.language,
        region: account.region,
        zone: account.zone,
        state: account.state,
        unit_of_measurement: account.unit_of_measurement,
        date_of_birth: account.date_of_birth,
        education_level: account.education_level,
        last_name: account.last_name,
        firstName: account.first_name,
        govId: account.government_id,
        lastName: account.last_name,
        marital_status: account.marital_status,
        type: account.accountType?.category,
      })) || [],
    [data]
  );

  const paginationInfo = data?.accounts.paginatorInfo;

  return { rows, loading, paginationInfo };
};
