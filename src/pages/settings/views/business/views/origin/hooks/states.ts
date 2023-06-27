import { create } from "zustand";
import { OriginSettings } from "./queries";
import { certificationsInitializer, keywordInitializer } from "./utils";

// const example = {
//   "default-coffee_states": '["Cherry","Wet Parchment","Dry Parchment","Green"]',
//   "default-account_categories":
//     '["Agent","Farmer","Processing Facility","Plot","Buyer"]',
//   "default-process_methods":
//     '["Natural","Honey","Fully Washed","Experimental-Washed","Experimental-Natural"]',
//   "default-certifications":
//     '[{"name":"Fairtrade","code":"F"},{"name":"Organic","code":"O"},{"name":"C.A.F.E. Practices (Starbucks)","code":"C"},{"name":"4C","code":"4"},{"name":"Rainforest Alliance","code":"R"},{"name":"Bird Friendly","code":"B"}]',
//   "default-customized_terminology":
//     '[{"term":"Lot Name","description":"Number used to identify a batch of coffee"},{"term":"Supplier Account","description":"The entity that grows and supplies coffee"},{"term":"Address 1","description":"The top level of an address"},{"term":"Address 2","description":"Address 1 is part of Address 2"},{"term":"City","description":"The city that Address 2 is located in"},{"term":"Zone","description":"The \\u201czone\\u201d that the \\u201ccity\\u201d is located in"},{"term":"District","description":"The \\u201cdistrict\\u201d that the \\u201ccity\\u201d is located in"},{"term":"Government ID","description":"Personal ID number or code used by government"},{"term":"Coffee State","description":"The state of the coffee (ex: \\u201cCherry\\u201d, \\u201cParchment\\u201d)"},{"term":"Grade","description":"A type or quality indicator of the coffee"},{"term":"Source","description":"The source of the coffee in the operation"},{"term":"Reception","description":"The location the cherry is received to"},{"term":"Inventory","description":"The lots that have been approved"},{"term":"External Receipt Number","description":"Number for the transaction, when coffee is purchased"},{"term":"Allocated","description":"Coffee that has been earmarked for a specific buyer"},{"term":"Commission","description":"Additional cost per unit of coffee cherry"}]',
//   "default-new_org_request": {
//     "whatsapp_number": "+12184193475",
//     "message_body": "Hi I need new Orignization",
//   },
//   "Account Types-Our Words": '{"baz":"qux"}',
//   "Coffee Terms-Wet Perchment": '{"foo":"bar"}',
//   "Coffee Terms-Dry Parchment": '{"foo":"bar"}',
//   "Units of Measure-your unit of Measure": '{"baz":"qux"}',
//   "tenant-certifications": [
//     {
//       "name": "Fairtrade",
//       "code": "F",
//       "id": "F",
//     },
//     {
//       "name": "Organic",
//       "code": "O",
//       "id": "O",
//     },
//     {
//       "name": "C.A.F.E. Practices (Starbucks)",
//       "code": "C",
//       "id": "C",
//       "active": true,
//     },
//     {
//       "name": "4C",
//       "code": "4",
//       "id": "4",
//     },
//     {
//       "name": "Rainforest Alliance",
//       "code": "R",
//       "id": "R",
//     },
//     {
//       "name": "Bird Friendly",
//       "code": "B",
//       "id": "B",
//     },
//   ],
//   "tenant-terminology": [
//     {
//       "term": "Lot Name",
//       "description": "Number used to identify a batch of coffee",
//       "id": "Lot Name",
//       "label": "",
//     },
//     {
//       "term": "Supplier Account",
//       "description": "The entity that grows and supplies coffee",
//       "id": "Supplier Account",
//     },
//     {
//       "term": "Address 1",
//       "description": "The top level of an address",
//       "id": "Address 1",
//       "label": "Address 1",
//     },
//     {
//       "term": "Address 2",
//       "description": "Address 1 is part of Address 2",
//       "id": "Address 2",
//     },
//     {
//       "term": "City",
//       "description": "The city that Address 2 is located in",
//       "id": "City",
//     },
//     {
//       "term": "Zone",
//       "description": "The “zone” that the “city” is located in",
//       "id": "Zone",
//     },
//     {
//       "term": "District",
//       "description": "The “district” that the “city” is located in",
//       "id": "District",
//     },
//     {
//       "term": "Government ID",
//       "description": "Personal ID number or code used by government",
//       "id": "Government ID",
//     },
//     {
//       "term": "Coffee State",
//       "description": "The state of the coffee (ex: “Cherry”, “Parchment”)",
//       "id": "Coffee State",
//     },
//     {
//       "term": "Grade",
//       "description": "A type or quality indicator of the coffee",
//       "id": "Grade",
//     },
//     {
//       "term": "Source",
//       "description": "The source of the coffee in the operation",
//       "id": "Source",
//     },
//     {
//       "term": "Reception",
//       "description": "The location the cherry is received to",
//       "id": "Reception",
//     },
//     {
//       "term": "Inventory",
//       "description": "The lots that have been approved",
//       "id": "Inventory",
//     },
//     {
//       "term": "External Receipt Number",
//       "description": "Number for the transaction, when coffee is purchased",
//       "id": "External Receipt Number",
//     },
//     {
//       "term": "Allocated",
//       "description": "Coffee that has been earmarked for a specific buyer",
//       "id": "Allocated",
//     },
//     {
//       "term": "Commission",
//       "description": "Additional cost per unit of coffee cherry",
//       "id": "Commission",
//     },
//   ],
//   "harvest_seasons-main": [
//     {
//       "id": "1",
//       "name": "Harvest 2020",
//       "start": "2020-06-26T21:00:00.000Z",
//       "end": "2022-06-18T21:00:00.000Z",
//     },
//   ],
//   "coffee_terms-main": [
//     {
//       "id": "2",
//       "coffee_state": "Cherry",
//       "label": "Uva",
//       "grades": ["A", "B"],
//       "locations": ["Wet Mill"],
//     },
//   ],
//   "tenant-grades": ["A", "B"],
//   "tenant-locations": ["Wet Mill"],
//   "uom-LtoKg": [
//     {
//       "id": "3",
//       "coffee_state": "Cherry",
//       "uom": "Bag",
//       "toL": "2",
//       "toKg": "2",
//     },
//   ],
//   "locations-main": [
//     {
//       "id": "4",
//       "location": "Wet Mill",
//       "sub_locations": ["Home"],
//       "category": "Agent",
//       "process_methods": ["PM1"],
//       "release_inventory": true,
//     },
//   ],
//   "uom-toKg": [
//     {
//       "id": "5",
//       "uom": "Bag",
//       "value": "2",
//     },
//   ],
//   "account_types-main": [
//     {
//       "id": "6",
//       "category": "Agent",
//       "account_type": "Someone",
//     },
//   ],
//   "tenant-process_methods": ["PM1"],
//   "yield_estimations-main": [
//     {
//       "id": "7",
//       "process_method": "PM1",
//       "cherry_to_wet": "40",
//       "wet_to_dry": "40",
//       "dry_to_green": "20",
//       "total": 3.2,
//     },
//   ],
// };

type OriginSettingState = {
  settings: Record<string, unknown[]>;
  empty: boolean;
  setter: (key: string, value: unknown[]) => void;
  init: (value: OriginSettings[]) => boolean;
};

export const useOriginSettingState = create<OriginSettingState>((set) => ({
  settings: {},
  empty: true,
  setter: (key: string, value: unknown[]) =>
    set((state) => ({ ...state, state: { ...state.settings, [key]: value } })),
  init: (value) => {
    const empty = value.every((item) => item.group === "default");
    const newValue = value.reduce(
      (acc, curr) => ({
        ...acc,
        [`${curr.group}-${curr.key}`]: curr.payload ?? [],
      }),
      {}
    );
    let settings = certificationsInitializer(value, newValue);
    settings = keywordInitializer(value, settings);
    set({ settings, empty });

    return empty;
  },
}));

// ===== functions overloads =====
export function useOriginSettingGetter<T>(group: string, key: string): T;
export function useOriginSettingGetter<T, R>(
  group: string,
  key: string,
  mapper: (payload: T) => R
): R;
// ===== to this method ==========

export function useOriginSettingGetter<T, R = unknown[]>(
  group: string,
  key: string,
  mapper?: (payload: T) => R
) {
  const setting = useOriginSettingState(
    (state) => state.settings[`${group}-${key}`]
  );
  if (mapper) return mapper(setting as T) as R;
  return setting as T;
}
// ===============================

export function useOriginSettingSetter<T extends unknown[]>(
  group: string,
  key: string
) {
  const setter = useOriginSettingState((state) => state.setter);
  return (payload: T) => setter(`${group}-${key}`, payload);
}

// ===== functions overloads =====

export function useOriginSetting<T extends unknown[]>(
  group: string,
  key: string
): [T, (payload: T) => void];

export function useOriginSetting<T, R extends unknown[]>(
  group: string,
  key: string,
  mapper: (payload: T) => R
): [R, (payload: R) => void];

// ===== to this method ==========

export function useOriginSetting<T, R extends unknown[]>(
  group: string,
  key: string,
  mapper?: (payload: T) => R
) {
  const ogSetting = useOriginSettingState(
    (state) => state.settings[`${group}-${key}`]
  );

  const setting = mapper ? (mapper(ogSetting as T) as R) : (ogSetting as T);

  const oGSetter = useOriginSettingState((state) => state.setter);

  const setter = (payload: R) => oGSetter(`${group}-${key}`, payload);

  return [setting, setter] as const;
}

// ===============================
