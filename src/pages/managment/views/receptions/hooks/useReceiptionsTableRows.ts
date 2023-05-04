import { useQuery } from "@apollo/client";
import { receiptionQuery } from "../graphql/queries/ReceiptionsQuery";
import { Response } from "../types";

export const useReceiptionsTableRows = () => {
  const { data, loading } = useQuery<Response>(receiptionQuery);
  const rows =
    data?.receptions?.data?.map?.((reception) => ({
      id: reception.id,
      receptionDate: new Date(reception.attributes.date),
      status: reception.attributes.status,
      accountId: reception.attributes.account.data.id,
      accountName: reception.attributes.account.data.attributes.name,
      lotNumber: reception.attributes.lot.data?.attributes?.number,
      grade: reception.attributes.lot.data?.attributes?.grade,
      weight: reception.attributes.lot.data?.attributes?.weight,
      totalCost: reception.attributes.totalCost,
      payment: reception.attributes.payment,
      commission: reception.attributes.comission,
      uom: reception.attributes.lot.data?.attributes?.uom,
      cherry_price: reception.attributes.cherryPrice,
      currency_fixed: reception.attributes.currecnyFixed,
    })) || [];

  return { rows, loading };
};
