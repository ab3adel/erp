import { Components, Theme } from "@mui/material";
import { CssBaselineOverrides } from "./CssBaseLine";
import { MuiFormLableOverrides } from "./FormLabel";
import { ButtonStylesOverrides } from "./Button";
import { MuiFormHelperTextOverrides } from "./FormHelperText";
import { MuiIconButtonOverrides } from "./IconButton";
import { MenuStylesOverrides } from "./Menu";
import { MenuItemStylesOverrides } from "./MenuItem";
import { ContainerStylesOverrides } from "./container";
import { DialogStylesOverrides } from "./Dialog";
import { OutlinedInputOverrides } from "./OutlinedInput";

export const componentOverrides: Components<Theme> = {
  MuiCssBaseline: CssBaselineOverrides,
  MuiFormLabel: MuiFormLableOverrides,
  MuiButton: ButtonStylesOverrides,
  MuiFormHelperText: MuiFormHelperTextOverrides,
  MuiIconButton: MuiIconButtonOverrides,
  MuiMenu: MenuStylesOverrides,
  MuiMenuItem: MenuItemStylesOverrides,
  MuiContainer: ContainerStylesOverrides,
  MuiDialog: DialogStylesOverrides,
  MuiOutlinedInput: OutlinedInputOverrides,
};
