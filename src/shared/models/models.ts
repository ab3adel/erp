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
  country?: Country;
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
  currency?: {
    id: number;
    name: string;
  };
  farmSizeUom?: {
    id: number;
    name: string;
  };
  farmSpacingUom?: {
    id: number;
    name: string;
  };
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
  varietal_id: string;
  varietal: {
    name: string;
    id: number;
  };
  files: Media[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  group: string;
  tenant_id: string
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
  entity: { name: string; email: string; is_active: boolean };
  modules: { src: string; name: string }[];
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

type Country = {
  id: number;
  name: string;
};

type City = {
  id: number;
  name: string;
};

export interface Lot {
  id: string;
  uuid: string;
  status: string;
  grade: string;
  weight: number | null;
  commission_uom: string | null;
  total_price: number;
  cherry_price: number;
  name: string | null;
  cupping_score: string | null;
  coffee_state: string;
  reception_date: string | null;
  cost_per_uom: number | null;
  is_paid: boolean | null;
  is_combined: boolean | null;
  certification: string | null;
  receivedTo?: {
    id: number;
    name: string;
  };
  account?: {
    id: number;
    name: string;
  };
  tags: Pick<Tag, "id">[];
  currency?: {
    id: number;
    name: string;
  };
}
