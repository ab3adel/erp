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
import { useMatches, useNavigate } from "react-router-dom";
import { useNavigationTreeItems } from "../hooks/useNavigationsItems";

export const Drawer = () => {
  const [dasboardNavs, ...navs] = useNavigationTreeItems();
  const navigate = useNavigate();
  const matches = useMatches();

  const customNavs = matches.find((match) =>
    Boolean((match.handle as Handle)?.navs)
  );

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
      {customNavs ? (
        (customNavs.handle as Handle).navs
      ) : (
        <>
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
          <GenericTreeView
            treeNodes={navs}
            onNodeClick={(key) => navigate(key)}
          />
          <MenuItem
            onClick={() => {
              navigate("/settings");
            }}
            sx={{ mb: 2 }}
          >
            <ListItemIcon>
              <SettingsOutlinedIcon
                fontSize="small"
                sx={{ color: "common.black" }}
              />
            </ListItemIcon>
            <ListItemText sx={{ color: "common.black" }}>Settings</ListItemText>
          </MenuItem>
        </>
      )}
    </MuiDrawer>
  );
};

type Handle = {
  navs: JSX.Element;
};
