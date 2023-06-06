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
  first_name?: string;
  last_name?: string;
  government_id?: string;
  mobileNumber?: string;
  district?: string;
  completeness?: number;
  status?: string;
  address1?: string;
};

export interface AccountInput {
  id?: number;
  name?: string;
  status?: string;
  subscription_type?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  currency?: string;
  district?: string;
  government_id?: string;
  language?: string;
  region?: string;
  zone?: string;
  state?: string;
  unit_of_measurement?: string;
  date_of_birth?: string;
  education_level?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  marital_status?: string;
  members_in_household?: number;
  read_literate?: string;
  write_literate?: string;
  total_children?: number;
  type_id?: number;
}
