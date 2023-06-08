import { useQuery } from "@apollo/client";
import { accountsQuery } from "../graphql/queries/AccountsQuery";
import { AccountRow, AccountsResponse } from "../types";
import { useMemo } from "react";
import { GridPaginationModel } from "@mui/x-data-grid-pro";

export const useAccountsTableRows = (paginationModel: GridPaginationModel) => {
  const { data, loading } = useQuery<AccountsResponse>(accountsQuery, {
    variables: {
      first: paginationModel.pageSize,
      page: paginationModel.page + 1,
    },
  });

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
        first_name: account.first_name,
        marital_status: account.marital_status,
        type: account.accountType?.category,
        mobileNumber: account.contacts?.find(
          (contact) => contact.type === "phone"
        )?.contact_info,
      })) || [],
    [data]
  );

  const paginationInfo = data?.accounts.paginatorInfo;

  return { rows, loading, paginationInfo };
};
