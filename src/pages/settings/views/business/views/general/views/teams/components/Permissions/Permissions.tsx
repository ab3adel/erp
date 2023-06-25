import { BoxProps, Button, TextFieldProps } from "@mui/material";
import {
  Typography,
  Box,
  Divider,
  Avatar,
  TextField,
  Autocomplete,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { FunctionComponent, useCallback, useMemo, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PermissionControlForm, {
  PermissionControlFormProps,
} from "../PermissionControlForm";
import { Abilities } from "../../hooks/useAbilities";

interface GroupedAbilites {
  [key: string]: Abilities[];
}

interface PermissionsProps {
  groupedAbilites?: GroupedAbilites;
  organizationName?: string;
  email?: string;
  value: PermissionControlFormProps["value"];
  onAbilitesChange?: PermissionControlFormProps["onChange"];
  shownPanels: string[];
  onShowPanelChange?: (category: string, status: boolean) => void;
  onCustomizedPermissionButtonClick?: () => void;
  showCustomizationPanels?: boolean;
  onPermissionInputChange: (value: number) => void;
  permissionValue: number;
  mode?: "add" | "edit";
  containerProps?: BoxProps;
  emailFieldProps?: TextFieldProps;
}

const Permissions: FunctionComponent<PermissionsProps> = (props) => {
  const {
    groupedAbilites,
    email,
    organizationName,
    value,
    onAbilitesChange,
    shownPanels,
    onShowPanelChange,
    onCustomizedPermissionButtonClick,
    showCustomizationPanels,
    onPermissionInputChange,
    permissionValue,
    mode,
    containerProps,
    emailFieldProps,
  } = props;

  const [openPermissionMenu, setOpenPermissionMenu] = useState(false);

  const handleClose = useCallback(() => setOpenPermissionMenu(false), []);

  const handleOpen = useCallback(() => setOpenPermissionMenu(true), []);

  const accessLevelOptions = useMemo(
    () => [
      {
        primary: "Admin",
        secondary:
          "Has full read, write and delete access. Can edit organization details.",
        value: 1,
      },
      {
        primary: "Read & Write",
        secondary:
          "Has full view and edit access but can’t delete. Can’t edit organization details.",
        value: 2,
      },
      {
        primary: "Read",
        secondary: "Has no edit or delete access to any section ",
        value: 3,
      },
      {
        primary: "Hide",
        secondary: "Has no permission for any section ",
        value: 4,
      },
      {
        primary: "Customized",
        secondary: "Has customized permission",
        value: 5,
      },
    ],
    []
  );

  return (
    <Box my={8} {...containerProps}>
      {mode === "add" && (
        <>
          <Typography
            fontWeight={500}
            sx={{ mb: 1 }}
            color="text.primary"
            variant="h6"
          >
            Manage Team Permissions
          </Typography>
          <Typography color="text.secondary" variant="body1">
            Define roles and access levels for this new team member
          </Typography>
          <Divider sx={{ my: 3 }} />

          <Typography variant="body1">Giving access to:</Typography>

          <Box display="flex" alignItems="center" gap={2} mt={4} mx={2}>
            <Avatar></Avatar>
            <Box>
              <Typography variant="body1" color="text.primary">
                {email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {organizationName}
              </Typography>
            </Box>
          </Box>
        </>
      )}

      {mode === "edit" && (
        <>
          <Typography variant="h6" color="text.primary" fontWeight={500} mb={3}>
            Edit Email & Permissions
          </Typography>
          <Typography variant="body1" color="text.primary" fontWeight={400}>
            User Email
          </Typography>
          <Divider sx={{ my: 3 }} />
          <Typography
            variant="body1"
            color="text.primary"
            fontWeight={400}
            mb={1}
          >
            Edit User Email
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            The user must confirm the change from the new email address in order
            to activate it
          </Typography>
          <Box maxWidth={400} mb={3}>
            <TextField
              variant="filled"
              label="Email"
              fullWidth
              {...emailFieldProps}
            />
          </Box>

          <Typography
            variant="body1"
            color="text.primary"
            fontWeight="400"
            mb={3}
          >
            Permissions and Access
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" color="text.primary" mb={1}>
            Edit User Permissions
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Edit permissions and access privileges for this team member
          </Typography>
        </>
      )}

      <Box maxWidth={400} mt={3}>
        <Autocomplete
          onClose={handleClose}
          open={openPermissionMenu}
          value={accessLevelOptions.find(
            (item) => item.value === permissionValue
          )}
          options={accessLevelOptions}
          fullWidth
          getOptionLabel={(option) => option.primary}
          renderOption={(_, option, index) => (
            <>
              <ListItemButton
                disabled={option.value === 5}
                onClick={() => {
                  handleClose();
                  onPermissionInputChange?.(option.value);
                }}
                {...option}
              >
                <ListItemText
                  primary={option.primary}
                  secondary={option.secondary}
                />
              </ListItemButton>
              {index.index !== accessLevelOptions.length - 1 && <Divider />}
            </>
          )}
          renderInput={(props) => (
            <TextField
              onClick={handleOpen}
              variant="filled"
              label="Permissions"
              {...props}
            />
          )}
        />
      </Box>

      <Box mt={1}>
        <Button
          color="secondary"
          variant="text"
          sx={{ color: "text.secondary" }}
          startIcon={
            showCustomizationPanels ? (
              <KeyboardArrowDownIcon />
            ) : (
              <ChevronRightIcon />
            )
          }
          onClick={onCustomizedPermissionButtonClick}
        >
          customize permissions & access
        </Button>
      </Box>
      {showCustomizationPanels && (
        <>
          <Box my={3}>
            <Typography
              fontWeight={500}
              sx={{ mb: 1 }}
              color="text.primary"
              variant="body1"
            >
              Configure User Permissions
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Use the radio buttons to customize access privileges for team
              members.
            </Typography>
          </Box>
          {groupedAbilites &&
            Object.entries(groupedAbilites).map((abilityGroup) => (
              <Box mt={5}>
                <PermissionControlForm
                  key={abilityGroup[0]}
                  category={abilityGroup[0]}
                  abilities={abilityGroup[1]}
                  value={value}
                  onChange={onAbilitesChange}
                  showPanel={shownPanels?.includes(abilityGroup[0])}
                  showButtonProps={{
                    onChange: (_, status) =>
                      onShowPanelChange?.(abilityGroup[0], status),
                    checked: shownPanels?.includes(abilityGroup[0]),
                  }}
                />
              </Box>
            ))}
        </>
      )}
    </Box>
  );
};

export default Permissions;

Permissions.defaultProps = {
  mode: "add",
};
