import { useQuery } from "@apollo/client";
import { meQuery } from "../graphql/queries/me";
import { Data } from "../types/me.types";

export const useMeQuery = () => {
  return useQuery<Data>(meQuery);
};
