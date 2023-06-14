import { Account } from "@/shared/models/models";

export const isAccountRowValid = (row: Account) => {
  return (
    row?.name &&
    row?.address1 &&
    row?.accountType &&
    row.country &&
    row.subscription_type &&
    row.currency
  );
};
