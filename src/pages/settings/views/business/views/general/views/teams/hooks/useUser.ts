import { useQuery } from "@apollo/client";
import { query } from "../graphql/queries/user";

export interface Params {
  id: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  modules: string[];
  role: string;
  abilities: Ability[];
}

interface Ability {
  id: string;
  title: string;
}

interface Data {
  user: User;
}

export const useUser = (params: Params) => {
  return useQuery<Data, Params>(query, { variables: params });
};
