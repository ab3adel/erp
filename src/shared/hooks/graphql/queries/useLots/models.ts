import { Lot, PaginatorInfo } from "@/shared/models/models";

export interface LotsData {
  lots: {
    data: Lot[];
    paginatorInfo: PaginatorInfo;
  };
}

export interface Params {
  filter?: {
    ids?: number[];
  };
  first?: number;
  page?: number;
}
