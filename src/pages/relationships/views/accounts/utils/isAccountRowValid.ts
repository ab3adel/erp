import { Account } from "@/shared/models/models";

export const isAccountRowValid = (row: Account) => {
  return (
    row?.name &&
    row?.address1 &&
    row?.accountType &&
    row?.country &&
    row?.currency &&
    (row?.accountType?.category === "farmer"
      ? row?.subscription_type
        ? true
        : false
      : true)
  );
};
