import { PaginatorInfo, Tag } from "@/shared/models/models";

interface Account {
  name: string;
}

interface Lot {
  number: string;
  grade: string;
  weight: number;
  uom: string;
}

interface ReceptionEntity {
  id: string;
  uuid: string;
  status: string;
  grade: string;
  weight: string;
  commission_uom: string;
  total_price: number;
  cherry_price: number;
  name: string;
  cupping_score: string;
  coffee_state: string;
  reception_date: string;
  cost_per_uom: string;
  is_paid: boolean;
  is_combined: true;
  certification: string;
  receivedTo: {
    id: number;
    name: string;
  };
  account: {
    id: number;
    name: string;
  };
  currency: {
    id: string;
    name: string;
  };
  tags: [
    {
      id: string;
    }
  ];
}

interface ResponseCollectionMeta {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pageCount: number;
  };
}

interface ReceptionEntityResponseCollection {
  data: ReceptionEntity[];
  paginatorInfo: PaginatorInfo;
}

export interface DataGridRow {
  id: string;
  receptionDate: Date;
  status: string;
  accountId: number;
  accountName: string;
  lotNumber: string;
  grade: string;
  weight: string;
  totalCost: number;
  payment: boolean;
  commission: string;
  uom: string;
  cherry_price: number;
  currency_fixed: string;
  tags: Tag[];
}

export interface Response {
  lots: ReceptionEntityResponseCollection;
}

type AddReceiptionAction = {
  type: "ADD_RECEIPTION";
};

type CancelReceiptionAction = {
  type: "CANCEL_RECEIPTION";
};

type SaveReceiptAction = {
  type: "SAVE_RECEIPTION";
};

export type Action =
  | AddReceiptionAction
  | CancelReceiptionAction
  | SaveReceiptAction;
