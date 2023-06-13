import { Button } from "@mui/material";
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
import { FunctionComponent, useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PermissionControlForm from "../../../../../components/PermissionControlForm";

interface PermissionsProps {}

const Permissions: FunctionComponent<PermissionsProps> = () => {
  const accessLevelOptions = [
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
  ];

  const [selectedAccessLevelValue, setSelectedAccessLevelValue] = useState(3);

  return (
    <Box my={8}>
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
            bianca@longmiles.com
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Long Miles Burundi
          </Typography>
        </Box>
      </Box>

      <Box maxWidth={400} mt={3}>
        <Autocomplete
          options={accessLevelOptions}
          fullWidth
          value={accessLevelOptions.find(
            (item) => item.value === selectedAccessLevelValue
          )}
          getOptionLabel={(option) => option.primary}
          renderOption={(_, option, index) => (
            <>
              <ListItemButton {...option}>
                <ListItemText
                  primary={option.primary}
                  secondary={option.secondary}
                />
              </ListItemButton>
              {index.index !== accessLevelOptions.length - 1 && <Divider />}
            </>
          )}
          renderInput={(props) => (
            <TextField variant="filled" label="Permissions" {...props} />
          )}
        />
      </Box>

      <Box mt={1}>
        <Button
          color="secondary"
          style={{ color: "#008E8F" }}
          startIcon={<ChevronRightIcon />}
        >
          customize permissions & access
        </Button>
      </Box>

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
          Use the radio buttons to customize access privileges for team members.
        </Typography>
      </Box>

      <Box mt={5}>
        <PermissionControlForm />
      </Box>
    </Box>
  );
};

export default Permissions;
