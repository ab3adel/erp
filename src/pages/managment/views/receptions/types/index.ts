interface Account {
  name: string;
}

interface Lot {
  number: string;
  grade: string;
  weight: number;
  uom: string;
}

interface Reception {
  date: string;
  status: string;
  account: {
    data: {
      id: string;
      attributes: Account;
    };
  };
  lot: {
    data: {
      id: string;
      attributes: Lot;
    };
  };
  totalCost: number;
  payment: boolean;
  comission: number;
  cherryPrice: number;
  currecnyFixed: string;
}

interface ReceptionEntity {
  id: string;
  attributes: Reception;
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
  meta: ResponseCollectionMeta;
}

export interface DataGridRow {
  receptionDate: string;
  status: string;
  accountId: string;
  accountName: string;
  lotNumber: string;
  grade: string;
  weight: number;
  totalCost: number;
  payment: boolean;
  commission: number;
  uom: string;
  cherry_price: number;
  currency_fixed: string;
}

export interface Response {
  receptions: ReceptionEntityResponseCollection;
}
