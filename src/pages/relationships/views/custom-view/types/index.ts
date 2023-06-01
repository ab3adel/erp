import { Account, PaginatorInfo } from "@/shared/models/models";

export interface AccountsResponse {
  accounts: {
    data: Account[];
    paginatorInfo: PaginatorInfo;
  };
}

export type AccountRow = {
  id: number;
  name?: string;
  type?: string;
  firstName?: string;
  lastName?: string;
  govId?: string;
  mobileNumber?: string;
  district?: string;
  completeness?: number;
  status?: string;
};
