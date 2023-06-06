import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  ButtonProps,
} from "@mui/material";
import { FunctionComponent } from "react";
import arrowDownIcon from "@/assets/images/arrow-down.svg";

import { styled } from "@mui/material";
import { useLogic } from "./Organizations.logic";

export const OrganizationButton = styled(Button)(() => ({
  color: "black !important",
  textTransform: "capitalize",
  fontSize: 13,
  lineHeight: 22,
}));

interface OrganizationProps {}

const Organization: FunctionComponent<OrganizationProps> = () => {
  const { anchorEl, handleCloseMenu, handleSetAnchorEl } = useLogic();

  const menuProps: MenuProps = {
    anchorOrigin: {
      horizontal: "left",
      vertical: "bottom",
    },
    MenuListProps: {
      sx: {
        my: 1,
      },
    },
    onClose: handleCloseMenu,
    open: Boolean(anchorEl),
    anchorEl: anchorEl,
  };

  const buttonProps: ButtonProps = {
    variant: "text",
    endIcon: <img src={arrowDownIcon} />,
    onClick: handleSetAnchorEl,
  };

  return (
    <>
      <OrganizationButton {...buttonProps}>
        long miles burundi
      </OrganizationButton>
      <Menu {...menuProps}>
        <MenuItem>
          <ListItemText primary="Organization 1" />
        </MenuItem>
        <MenuItem>
          <ListItemText primary="Organization 1" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Organization;
