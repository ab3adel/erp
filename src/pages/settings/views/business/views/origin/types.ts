import { GridRowId } from "@mui/x-data-grid-pro";

export type CoffeeTerm = {
  coffee_state: string;
  label: string;
  grades: string[];
  locations: string[];
};

export type UnitOfMesure = {
  uom: string;
  value: number;
};

export type VolumeToWieghtUnit = {
  uom: string;
  coffee_state: string;
  toL: number;
  toKg: number;
};

export type AccountType = {
  account_type: string;
  account_category: string;
};

export type ALocation = {
  location: string;
  sub_locations: string;
  category: string;
  process_methods: string[];
  release_inventory: boolean;
};

export type YieldEstimation = {
  process_method: string;
  cherry_to_wet: number;
  wet_to_dry: number;
  dry_to_green: number;
  total: number;
};

export type HarvestSeason = {
  name: string;
  start: string;
  end: string;
  show_in_inventory: boolean;
};

// ===============================
export type Settings = {
  coffeeTerms: CoffeeTerm[];
  unitsOfMesureVolume: UnitOfMesure[];
  unitsOfMesureWieght: UnitOfMesure[];
  unitsOfMesureArea: UnitOfMesure[];
  unitsOfMesureVolumeToWieght: VolumeToWieghtUnit[];
  accountTypes: AccountType[];
  locations: ALocation[];
  yieldEstimations: YieldEstimation[];
  harvestSeasons: HarvestSeason[];
};
// ===============================

export type Certification = {
  name: string;
  code: string;
};

export type Term = {
  term: string;
  description?: string;
  label?: string;
};

// ===============================
export type Tenants = {
  grades: string[];
  locations: string[];
  processMethods: string[];
  certifications: Certification[];
  terminology: Term[];
};
// ===============================

export type OriginSettings = {
  settings?: Partial<Settings>;
  tenants?: Partial<Tenants>;
};

export type WithId<T> = T & { id: GridRowId };
