import { GenericTreeView } from "@/shared/components/treeview";
import {
  Drawer as MuiDrawer,
  Toolbar,
  Divider,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { useNavigationTreeItems } from "../hooks/useNavigationsItems";

export const Drawer = () => {
  const [dasboardNavs, ...navs] = useNavigationTreeItems();
  const navigate = useNavigate();

  return (
    <MuiDrawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          border: "none",
          bgcolor: "transparent",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <GenericTreeView
        treeNodes={[dasboardNavs]}
        sx={{ height: "fit-content" }}
      />
      <Divider
        sx={{
          fontSize: "12px",
          alignItems: "flex-start",
          color: "text.disabled",
          my: 1,
        }}
      >
        APPS & PAGES
      </Divider>
      <GenericTreeView treeNodes={navs} onNodeClick={(key) => navigate(key)} />
      <MenuItem>
        <ListItemIcon>
          <SettingsOutlinedIcon
            fontSize="small"
            sx={{ color: "common.black" }}
          />
        </ListItemIcon>
        <ListItemText sx={{ color: "common.black" }}>Admin</ListItemText>
      </MenuItem>
    </MuiDrawer>
  );
};
