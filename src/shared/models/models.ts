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
  notes?: Note[];
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
  files: Media[];
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

export type Note = {
  id: number;
  note_title: string;
  note_body: string;
  account: Account;
  created_at: Date;
  updated_at: Date;
};
export interface IOrganization {
  id: number;
  city: string;
  currency: string;
  language: string;
  plan: string;
  team_members?: number;
}

export interface IAssignedRoles {
  id: number;
  entity: { name: string; email: string };
  modules: string[];
  permissions: string[];
  role: string;
}

export interface Media {
  id: number;
  src: string;
  file_type: string;
  model_type: string;
  zone: string;
}
