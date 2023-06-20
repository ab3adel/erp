import { Radio } from "@mui/material";
import { FunctionComponent } from "react";
import {
  OutputValue,
  PermissionControlFormProps,
} from "./PermissionControlForm";
import {
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid-pro";
import { Abilities } from "../hooks/useAbilities";

interface PermissionRadioButtonProps
  extends Pick<PermissionControlFormProps, "value" | "onChange"> {
  targetActions: string[];
  rowProps: GridRenderCellParams<
    [string, Abilities[]],
    unknown,
    unknown,
    GridTreeNodeWithRender
  >;
}

const PermissionRadioButton: FunctionComponent<PermissionRadioButtonProps> = (
  props
) => {
  const { targetActions, rowProps, value, onChange } = props;

  const target_ids = rowProps.row[1]
    .filter((item) => targetActions.includes(item.title))
    .map((item) => item.id);

  const currentSubcategoryIds = rowProps.row[1].map((item) => item.id);

  const outputValue: OutputValue = {
    subcategory: rowProps.row[0],
    abilities: target_ids,
  };

  const IsSelected =
    target_ids.every((item) => value.includes(item)) &&
    value.filter((item) => currentSubcategoryIds.includes(item)).length ===
      targetActions.length;

  return <Radio checked={IsSelected} onClick={() => onChange?.(outputValue)} />;
};

export default PermissionRadioButton;
