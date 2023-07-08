import { useQuery } from "@apollo/client";
import { query } from "./query";
import { LotsData, Params } from "./models";

export const useLots = (params: Params) => {
  return useQuery<LotsData, Params>(query, { variables: params });
};
