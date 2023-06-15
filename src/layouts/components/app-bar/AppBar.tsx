import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Box,
  InputBase,
  Avatar,
  MenuItem,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MainLogo from "@/assets/images/main_logo.svg";
import { DropDownMenu } from "@/shared";
import { useSignout } from "../../hooks/useSignout";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Organization from "./components/organizations/Organizations";

export const AppBar = () => {
  const signout = useSignout();
  return (
    <MuiAppBar
      color="transparent"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      elevation={0}
    >
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            justifyContent: "start",
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton>
            <img src={MainLogo} alt="logo" />
          </IconButton>
          <Box sx={{ mx: 2 }}>
            <Divider orientation="vertical" style={{ height: "30px" }} />
          </Box>
          <Organization />
        </Box>

        <Box display="flex" columnGap={3} alignItems="center">
          <InputBase
            placeholder="Search"
            sx={{ color: "#2428288F" }}
            startAdornment={<SearchIcon sx={{ mr: 2 }} />}
          />
          <Box display="flex" alignItems="center">
            <IconButton>
              <HelpOutlineIcon sx={{ color: "#2428288F" }} fontSize="large" />
            </IconButton>
            <DropDownMenu
              button={(props) => (
                <IconButton {...props}>
                  <Avatar sx={{ width: 35, height: 35 }}>OP</Avatar>
                </IconButton>
              )}
            >
              <MenuItem onClick={signout}>Signout</MenuItem>
            </DropDownMenu>
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
