export interface PaginatorInfo {
  count: number;
  currentPage: number;
  firstItem: number;
  hasMorePages: boolean;
  lastItem: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface Account {
  id: number;
  name?: string;
  category?: string;
  completeness?: number;
  status?: string;
  tags?: string;
  subscription_type?: string;
  address1?: string;
  address2?: any;
  city?: string;
  country?: string;
  district?: string;
  government_id?: any;
  language?: string;
  region?: string;
  zone?: any;
  state?: string;
  unit_of_measurement?: string;
  date_of_birth?: string;
  education_level?: string;
  first_name?: string;
  last_name?: string;
  gender?: any;
  marital_status?: string;
  members_in_household?: number;
  read_literate?: string;
  write_literate?: string;
  total_children?: number;
  created_at?: string;
  updated_at?: string;
  accountType?: AccountType;
}

export interface AccountType {
  id: number;
  name: string;
  category: string;
  created_at: string;
  updated_at: string;
}
