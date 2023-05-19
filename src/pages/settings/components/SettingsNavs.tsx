import { GenericTreeView } from "@/shared/components/treeview";
import { Box, Divider, IconButton } from "@mui/material";
import { useNavsItem } from "../hooks/useNavsItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export const SettingsNavs = () => {
  const navs = useNavsItem();
  const navigate = useNavigate();

  return (
    <Box>
      <IconButton
        onClick={() => {
          navigate("/");
        }}
        sx={{ my: 2 }}
      >
        <ArrowBackIcon color="primary" />
      </IconButton>
      <Divider
        sx={{
          fontSize: "12px",
          alignItems: "flex-start",
          color: "text.disabled",
          my: 1,
        }}
      >
        ACCOUNTS SETTINGS
      </Divider>
      <GenericTreeView
        treeNodes={navs}
        sx={{ height: "fit-content" }}
        onNodeClick={(key) => {
          navigate(key);
        }}
      />
    </Box>
  );
};
