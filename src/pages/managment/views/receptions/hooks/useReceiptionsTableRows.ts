export const useReceiptionsTableRows = (): Record<string, any>[] => {
  return Array.from(new Array(50)).map((_, index) => ({
    id: index,
    receptionDate: new Date(),
    status: "Pending",
    accountId: `${index + 2}`,
    accountName: `Account ${index + 2}`,
    lotNumber: `${index + 2}`,
    grade: `Grade ${index + 2}`,
    weight: `${index + 2}`,
    totalCost: `${index + 2}`,
    payment: true,
    commission: `${index + 2}`,
    uom: "KG",
    cherry_price: `${index + 2}`,
    currency_fixed: "USD",
  }));
};
