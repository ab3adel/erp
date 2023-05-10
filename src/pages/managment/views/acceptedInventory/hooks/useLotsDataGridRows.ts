import { useQuery } from "@apollo/client";
import { lotsQuery } from "../graphql/queries/lots";
import { useMemo } from "react";

export const useLotsDataGridRows = () => {
  const { data, loading } = useQuery<LotsResponse>(lotsQuery);
  const rows: Record<string, any>[] = useMemo(() => {
    return (
      data?.lots.data.map((lot) => ({
        id: lot.id,
        ...lot.attributes,
      })) || []
    );
  }, [data]);

  return { rows, loading };
};
