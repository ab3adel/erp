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
  weight: number;
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
  lot_number: string;
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
      name: string;
      color: string;
      group: string;
      tenant_id: string;
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
  id: number;
  reception_date: string;
  status: string;
  account_id: number;
  accountName: string;
  grade: string;
  weight: number;
  total_price: number;
  is_paid: boolean;
  commission_uom: string;
  cost_per_uom: string;
  cherry_price: number;
  currency_fixed: string;
  tags: Tag[];
  lot_number: string;
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
