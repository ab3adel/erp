import { useMemo } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

export type OriginSettings = {
  // id: string;
  group: string;
  key: string;
  payload: Array<unknown>;
  locked?: boolean;
  order?: number;
};

type AllOriginSettingsResponse = {
  GetAllOriginSettings: OriginSettings[];

};

type OriginSettingByGroupResponse = {
  getOriginSettingByGroup: {
    data: OriginSettings[];
  };
};

type OriginSettingResponse = {
  getOriginSetting: {
    payload: Array<unknown>;
  } | null;
};

const GetAllOriginSettingsQuery = gql`
  query GetAllOriginSettings {
    GetAllOriginSettings {
        group
        key
        payload
    }
  }
`;

export const useAllOriginSettingsQuery = (
  onCompleted?: (data: OriginSettings[]) => void
) => {
  const { data, loading } = useQuery<AllOriginSettingsResponse>(
    GetAllOriginSettingsQuery,
    {
      onCompleted: (data) => onCompleted?.(data.GetAllOriginSettings),
    }
  );
  return { data, loading };
};

const getOriginSettingsByGroupQuery = gql`
  query GetOriginSettingByGroup($group: String!, $key: String!) {
    getOriginSettingByGroup(first: 1000, group: $group, key: $key) {
      data {
        id
        group
        key
        payload
        locked
        order
      }
    }
  }
`;

export const useOriginSettingByGroupQuery = <TResult>(
  group: string,
  key?: string,
  mapper?: (data: OriginSettingByGroupResponse) => TResult,
  onCompleted?: (data: TResult) => void
) => {
  const { data, loading } = useQuery<OriginSettingByGroupResponse>(
    getOriginSettingsByGroupQuery,
    {
      variables: { group, key },
      onCompleted: (data) => {
        if (!data || !mapper) return;
        const mappedData = mapper(data);
        onCompleted?.(mappedData);
      },
    }
  );
  const rows = useMemo(() => {
    if (!data) return undefined;
    return mapper?.(data) ?? data;
  }, [data]);

  return { rows, loading };
};

const getOriginSettingQuery = gql`
  query GetOriginSetting($group: String!, $key: String!) {
    getOriginSetting(group: $group, key: $key) {
      payload
    }
  }
`;

type OriginSettingQueryOptions<TResult> = {
  mapper?: (payload: unknown) => TResult;
  onCompleted?: (data: TResult | unknown) => void;
};

export const useOriginSettingQuery = <TResult>(
  group: string,
  key: string,
  options?: OriginSettingQueryOptions<TResult>
) => {
  const { data, loading } = useQuery<OriginSettingResponse>(
    getOriginSettingQuery,
    {
      variables: { group, key },
      onCompleted: (data) => {
        if (!data || !options) return;
        const payload = data.getOriginSetting?.payload ?? [];
        if (!options.mapper) return options.onCompleted?.(payload);
        const mappedData = options.mapper(payload);
        options?.onCompleted?.(mappedData);
      },
    }
  );
  const rows = useMemo(() => {
    if (!data) return [];
    const payload = data.getOriginSetting?.payload ?? [];
    return options?.mapper?.(payload) ?? payload;
  }, [data]);

  return { rows, loading };
};


const settings = [
  "coffee_terms__main",
  "tenant__grades",
  "tenant__locations",
  "uom__toL",
  "uom__toKg",
  "uom__toHa",
  "uom__LtoKg",
  "account_types__main",
  "locations__main",
  "tenant__process_methods",
  "yield_estimations__main",
  "harvest_seasons__main",
  "tenant__certifications",
  "tenant__terminology",
] as const;

type Keys = typeof settings;

export type MutationVariables = { [Key in Keys[number]]: any };
export type DoMutationVariables = {
  [K in Keys[number]as K extends string ? `do_${K}` : never]: any;
};

const originSettingMutation = gql`
  mutation CreateOrUpdateOriginSetting(
    ${settings.map(
  (setting) => `
    $${setting}: JSON!
    $do_${setting}: Boolean!
    `
)}
  ) {
    ${settings.map(
  (setting) =>
    `${setting}: CreateOrUpdateOriginSetting(
        input: { group: "${setting.split("__")[0]}", key: "${setting.split("__")[1]
    }", payload: $${setting} }
        ) @include(if: $do_${setting}) {
          group
          key
          payload
        }`
)}
  }
`;

export const useOriginSettingMutation = () => {
  const [mutate] = useMutation(originSettingMutation);
  return (variables: MutationVariables & DoMutationVariables) =>
    mutate({ variables });
};
