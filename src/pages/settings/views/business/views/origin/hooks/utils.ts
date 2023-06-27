import { useCallback, useMemo } from "react";
import { cloneDeep, uniqueId } from "lodash";
import { GridRowId } from "@mui/x-data-grid-pro";
import { useOriginSetting, useOriginSettingState } from "./states";
import {
  DoMutationVariables,
  MutationVariables,
  OriginSettings,
  useOriginSettingMutation,
} from "./queries";
import { Certification, HarvestSeason, Term, WithId } from "../types";
import dayjs from "dayjs";

type Options<TRow> = {
  customMapper?: (data: TRow) => TRow;
  rowsChanged?: (newRows: TRow[]) => void;
};

export const useOriginSettingsRows = <TRow extends { id: GridRowId }>(
  group: string,
  key: string,
  options?: Options<TRow>
) => {
  const [state, setter] = useOriginSetting<TRow[]>(group, key);

  const deleteRow = useCallback((id: GridRowId) => {
    const filterdRows = state.filter((row) => row.id !== id);
    setter(filterdRows);
  }, []);

  const addRow = useCallback((callback?: (id: GridRowId) => void) => {
    const id = uniqueId();
    setter([...(state ?? []), { id }] as TRow[]);
    callback?.(id);
  }, []);

  const handleRowChange = (newRow: TRow) => {
    const rowIndex = state.findIndex((row) => row.id === newRow.id);

    const updatedRows = [...state];
    updatedRows[rowIndex] = newRow;

    setter(updatedRows);
    options?.rowsChanged?.(updatedRows);

    return newRow;
  };

  const ogRows = useMemo(
    () =>
      state?.map(
        options?.customMapper ?? ((row) => ({ ...row, id: uniqueId() }))
      ) ?? [],
    [state]
  );

  const rows = (
    options?.customMapper
      ? ogRows.map((row) => options.customMapper?.(row as TRow))
      : ogRows
  ) as TRow[];

  return {
    rows,
    addRow,
    deleteRow,
    setRows: setter,
    handleRowChange,
  };
};

export function certificationsInitializer(
  data: OriginSettings[],
  newValue: Record<string, any>
) {
  const certificationsJson = data.find(
    (setting) => setting.group === "default" && setting.key === "certifications"
  )?.payload;
  const certifications = JSON.parse(
    (certificationsJson ?? "[]") as string
  ) as Certification[];

  const myCertifications = data.find(
    (setting) => setting.group === "tenant" && setting.key === "certifications"
  )?.payload as Certification[];

  const newValueClone = cloneDeep(newValue);

  newValueClone["tenant-certifications"] = certifications.map((cert) => ({
    ...cert,
    id: cert.code,
    active: myCertifications?.some((mycert) => mycert.code === cert.code),
  }));

  return newValueClone;
}

export function keywordInitializer(
  data: OriginSettings[],
  newValue: Record<string, any>
) {
  const terminologyJson = data.find(
    (setting) =>
      setting.group === "default" && setting.key === "customized_terminology"
  )?.payload;
  const terminology = JSON.parse((terminologyJson ?? "[]") as string) as Term[];

  const myTerminology = data.find(
    (setting) => setting.group === "tenant" && setting.key === "terminology"
  )?.payload as Term[];

  const newValueClone = cloneDeep(newValue);

  newValueClone["tenant-terminology"] = terminology.map((t) => ({
    ...t,
    id: t.term,
    label: myTerminology?.find((t2) => t2.term === t.term)?.label,
  }));

  return newValueClone;
}

export function useSaveOriginSettings() {
  const settings = useOriginSettingState((state) => state.state) as Record<
    string,
    WithId<Record<string, any>>[]
  >;
  const createOrUpdate = useOriginSettingMutation();

  const stripId = ({ id, ...rest }: WithId<Record<string, any>>) => ({
    ...rest,
  });

  const formatDays = (season: HarvestSeason) => ({
    ...season,
    start: dayjs(season.start).toISOString(),
    end: dayjs(season.end).toISOString(),
  });

  function propertiesToJson(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (!key.startsWith("do"))
        obj[key] = obj[key] ? JSON.stringify(obj[key]) : "[]";
    });
  }

  const save = () => {
    const variables = {
      //
      account_types__main: settings["account_types-main"]?.map(stripId),
      do_account_types__main: !!settings["account_types-main"],

      //
      coffee_terms__main: settings["coffee_terms-main"]?.map(stripId),
      do_coffee_terms__main: !!settings["coffee_terms-main"],

      //
      harvest_seasons__main: settings["harvest_seasons-main"]
        ?.map(stripId)
        .map((season) => formatDays(season as HarvestSeason)),
      do_harvest_seasons__main: !!settings["harvest_seasons-main"],

      //
      locations__main: settings["locations-main"].map(stripId),
      do_locations__main: !!settings,

      //
      tenant__certifications: settings["tenant-certifications"]
        ?.map(stripId)
        .filter((row) => row.active),
      do_tenant__certifications: !!settings["tenant-certifications"],

      //
      tenant__grades: settings["tenant-grades"],
      do_tenant__grades: !!settings["tenant-grades"],

      //
      tenant__locations: settings["tenant-locations"],
      do_tenant__locations: !!settings["tenant-locations"],

      //
      tenant__process_methods: settings["tenant-process_methods"],
      do_tenant__process_methods: !!settings["tenant-process_methods"],

      //
      tenant__terminology: settings["tenant-terminology"]
        ?.map(stripId)
        .filter((row) => row.label),
      do_tenant__terminology: !!settings["tenant-terminology"],

      //
      uom__LtoKg: settings["uom-LtoKg"]?.map(stripId),
      do_uom__LtoKg: !!settings["uom-LtoKg"],

      //
      uom__toHa: settings["uom-toHa"]?.map(stripId),
      do_uom__toHa: !!settings["uom-toHa"],

      //
      uom__toKg: settings["uom-toKg"]?.map(stripId),
      do_uom__toKg: !!settings["uom-toKg"],

      //
      uom__toL: settings["uom-toL"]?.map(stripId),
      do_uom__toL: !!settings["uom-toL"],

      //
      yield_estimations__main: settings["yield_estimations-main"]?.map(stripId),
      do_yield_estimations__main: !!settings["yield_estimations-main"],

      //
    } satisfies MutationVariables & DoMutationVariables;
    propertiesToJson(variables);
    createOrUpdate(variables);
  };

  return save;
}
