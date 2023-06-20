import { useQuery } from "@apollo/client";
import { query } from "../graphql/queries/abilities";

export interface Params {
  first?: number;
  page?: number;
}

export interface Abilities {
  id: string;
  title: string;
  category: string;
  subcategory: string;
}

interface AbilitiesData {
  data: Abilities[];
}

interface Data {
  abilities: AbilitiesData;
}

export const useAbilities = (params: Params) => {
  return useQuery<Data, Params>(query, { variables: params });
};
