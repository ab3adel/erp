import { useQuery } from "@apollo/client";
import { query } from "../graphql/queries/varietals";

export interface Params {
  first?: number;
  page?: number;
}

export interface Varietals {
  id: 1;
  name: string;
}

interface VarietalsData {
  data: Varietals[];
}

interface Data {
  varietals: VarietalsData;
}

export const useVarietals = (params?: Params) => {
  return useQuery<Data, Params>(query, { variables: params });
};
