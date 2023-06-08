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
  currency?: string;
  farms?: Farm[];
  contacts?: Contact[];
  tags?: Tag[];
}

export interface AccountType {
  id: number;
  name: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Farm {
  id: string;
  average_tree_age: number;
  farm_name: string;
  size: number;
  spacing: number;
  varietals: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Contact {
  id: number;
  contact_info: string;
  type: string;
  is_primary?: boolean;
  account: Account;
  created_at: Date;
  updated_at: Date;
}

export type UserView = {
  id: string;
  name: string;
  module: string;
  is_shared: boolean;
  query: string;
  preferences: Preference[];
};

export type Preference = {
  id: string;
  is_closed: boolean;
  order: number;
};
