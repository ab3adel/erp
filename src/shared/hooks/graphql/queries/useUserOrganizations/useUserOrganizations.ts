import { useQuery } from "@apollo/client";
import { query } from "./query";

interface UserOrganization {
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
}

interface UserOrganizationsData {
  data: UserOrganization[];
}

interface ResponseData {
  userOrganizations: UserOrganizationsData;
}

export const useUserOrganiaztions = () => {
  return useQuery<ResponseData>(query);
};
