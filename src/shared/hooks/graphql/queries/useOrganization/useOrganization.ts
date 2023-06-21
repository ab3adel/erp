import { useQuery } from "@apollo/client";
import { query } from "./query";

interface Organization {
  organization?: {
    id: number;
    company_name: string;
    country: {
      id: number;
      name: string;
    };
    city: {
      id: number;
      name: string;
    };
    language: {
      id: number;
      name: string;
    };
    currency: {
      id: number;
      name: string;
    };
    plan: {
      id: number;
      name: string;
    };
    team_members: number;
    address_1: string;
    address_2: string;
    color: string;
    created_at: string;
    updated_at: string;
  };
}

interface Params {
  id: number;
}

export const useOrganiaztion = (params: Params) => {
  return useQuery<Organization, Params>(query, { variables: params });
};
