import { Lot, PaginatorInfo } from "@/shared/models/models";

export interface LotsData {
  data: {
    lots: {
      data: Lot[];
      paginatorInfo: PaginatorInfo;
    };
  };
}

export interface Params {
  ids: number[];
}
