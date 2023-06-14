import {
  Account,
  Contact,
  Farm,
  Note,
  PaginatorInfo,
  Tag,
} from "@/shared/models/models";

export interface AccountsResponse {
  accounts: {
    data: Account[];
    paginatorInfo: PaginatorInfo;
  };
}

export type AccountInput = {
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
  farms?: Farm[];
  contacts?: Partial<Contact>[];
  type_id?: number;
  tags?: Tag[];
  notes?: Note[];
};
