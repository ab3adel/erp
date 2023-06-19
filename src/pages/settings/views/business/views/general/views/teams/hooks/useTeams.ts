import { useQuery } from "@apollo/client";
import { teamMembers } from "../graphql/queries/teamMember";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  abilities: Ability[];
}

interface Ability {
  id: string;
  title: string;
}

interface UsersData {
  data: User[];
}

interface Response {
  users: UsersData;
}

export const useTeams = () => {
  return useQuery<Response>(teamMembers);
};
