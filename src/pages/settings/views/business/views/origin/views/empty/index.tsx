import { BuildOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useOriginSettingState } from "../../hooks/states";
import { useEffect } from "react";

const Empty = () => {
  const navigate = useNavigate();

  const empty = useOriginSettingState((state) => state.empty);

  useEffect(() => {
    if (!empty) navigate("saved-settings");
  }, []);

  return (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <BuildOutlined
        sx={{ color: "#2428288F", marginBottom: 1, fontSize: 44 }}
      />
      <Typography variant="h6" color="text.primary" fontWeight={500} mb={1}>
        Get Started
      </Typography>
      <Typography
        variant="body1"
        fontWeight={400}
        maxWidth="463px"
        textAlign="center"
        mb={3}
      >
        Tailor the platform to your organization's needs. Define coffee terms,
        units of measure, account types, locations, yield estimations, and more.
      </Typography>
      <Button startIcon={<EditOutlined />} onClick={() => navigate("wizard")}>
        Customize Settings
      </Button>
    </Box>
  );
};

export default Empty;
