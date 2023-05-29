import {
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const AgentFarms = () => {
  return (
    <Box p={3}>
      <Box display="flex" justifyContent="right" my={1}>
        <Button startIcon={<AddIcon />}>NEW FARM</Button>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={4}
      >
        <Typography variant="body1" fontWeight={600}>
          Name of farm
        </Typography>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>
      <Divider />
      <Grid container mt={2} spacing={3}>
        <Grid item xs={6} md={4}>
          <Typography
            variant="body1"
            sx={{ color: "grey.700" }}
            fontWeight={600}
          >
            Total Size
          </Typography>
          <Typography variant="body2" sx={{ color: "common.black" }}>
            250
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography
            variant="body1"
            sx={{ color: "grey.700" }}
            fontWeight={600}
          >
            Number of trees
          </Typography>
          <Typography variant="body2" sx={{ color: "common.black" }}>
            250
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography
            variant="body1"
            sx={{ color: "grey.700" }}
            fontWeight={600}
          >
            Vertials
          </Typography>
          <Typography variant="body2" sx={{ color: "common.black" }}>
            250
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography
            variant="body1"
            sx={{ color: "grey.700" }}
            fontWeight={600}
          >
            Spacing(m)
          </Typography>
          <Typography variant="body2" sx={{ color: "common.black" }}>
            250
          </Typography>
        </Grid>
        <Grid item xs={6} md={4}>
          <Typography
            variant="body1"
            sx={{ color: "grey.700" }}
            fontWeight={600}
          >
            Average tree age
          </Typography>
          <Typography variant="body2" sx={{ color: "common.black" }}>
            250
          </Typography>
        </Grid>
      </Grid>
      <Box mt={3} display="flex" justifyContent="space-between">
        <Typography variant="body1" sx={{ color: "grey.600" }}>
          Documents
        </Typography>
        <IconButton>
          <FileUploadIcon sx={{ color: "grey.600" }} />
        </IconButton>
      </Box>
    </Box>
  );
};
