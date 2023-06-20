import {
  Button,
  ListItemText,
  Menu,
  MenuItem,
  MenuProps,
  ButtonProps,
  styled,
  Box,
} from "@mui/material";
import { FunctionComponent } from "react";
import arrowDownIcon from "@/assets/images/arrow-down.svg";

import { useLogic } from "./Organizations.logic";

export const OrganizationButton = styled(Button)(() => ({
  color: "black !important",
  textTransform: "capitalize",
  fontSize: 13,
}));

const Organization: FunctionComponent = () => {
  const {
    anchorEl,
    handleCloseMenu,
    handleSetAnchorEl,
    organiztions,
    selectedOrganiztionId,
    setSelectedOrg,
    setSelectedTenentId,
  } = useLogic();

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
    <Box>
      <OrganizationButton {...buttonProps}>
        {
          organiztions?.userOrganizations.data.find(
            (item) => item.id === selectedOrganiztionId
          )?.company_name
        }
      </OrganizationButton>
      <Menu {...menuProps}>
        {organiztions?.userOrganizations.data.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              setSelectedOrg(item.id);
              setSelectedTenentId(item.tenant.id);
              handleCloseMenu();
            }}
          >
            <ListItemText primary={item.company_name} />
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Organization;
