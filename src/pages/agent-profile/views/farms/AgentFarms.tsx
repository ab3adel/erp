import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Grid,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import _ from "lodash";

type Farm = {
  id: string;
  name: "";
  totalSize: "";
  numberOfTrees: "";
  verticals: "";
  spacing: "";
  averageTreeAge: "";
};

export const AgentFarms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [newFarm, setNewFarm] = useState<Farm>({
    id: "",
    name: "",
    totalSize: "",
    numberOfTrees: "",
    verticals: "",
    spacing: "",
    averageTreeAge: "",
  });
  const [selectedFarm, setSelectedFarm] = useState<string>();

  const handleAddFarm = () => {
    const id = _.uniqueId();
    setFarms((prevFarms) => [{ ...newFarm, id }, ...prevFarms]);
    setNewFarm({
      name: "",
      totalSize: "",
      numberOfTrees: "",
      verticals: "",
      spacing: "",
      averageTreeAge: "",
      id,
    });
    setSelectedFarm(id);
  };

  console.log(farms);
  const handleDeleteFarm = (id: string) => {
    setFarms((prevFarms) => prevFarms.filter((farm) => farm.id !== id));
  };

  const handleEditFarm = (id: string) => {
    setSelectedFarm(id);
    setNewFarm(farms.find((farm) => farm.id === id)!);
  };

  const handleSaveFarm = () => {
    const updatedFarms = [...farms];
    updatedFarms[updatedFarms.length - 1] = newFarm;
    setFarms(updatedFarms);
    setSelectedFarm(undefined);
  };

  const handleFarmInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewFarm((prevFarm) => ({
      ...prevFarm,
      [name]: value,
    }));
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="right" my={1}>
        <Button startIcon={<AddIcon />} onClick={handleAddFarm}>
          ADD NEW FARM
        </Button>
      </Box>

      {farms.map((farm) => (
        <Box key={farm.id} mt={4}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {selectedFarm === farm.id ? (
              <TextField
                variant="filled"
                name="name"
                label="Name of farm"
                value={newFarm.name}
                onChange={handleFarmInputChange}
                sx={{
                  width: 400,
                }}
                required
              />
            ) : (
              <Typography variant="body1" fontWeight={600}>
                {farm.name}
              </Typography>
            )}

            {selectedFarm === farm.id ? (
              <Box>
                <IconButton onClick={handleSaveFarm}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteFarm(farm.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  handleEditFarm(farm.id);
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          <Divider />
          {selectedFarm === farm.id ? (
            <Grid container mt={2} spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="filled"
                  name="totalSize"
                  label="Total Size"
                  value={newFarm.totalSize}
                  onChange={handleFarmInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="filled"
                  name="numberOfTrees"
                  label="Number of trees"
                  value={newFarm.numberOfTrees}
                  onChange={handleFarmInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="filled"
                  name="verticals"
                  label="Verticals"
                  value={newFarm.verticals}
                  onChange={handleFarmInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="filled"
                  name="spacing"
                  label="Spacing (m)"
                  value={newFarm.spacing}
                  onChange={handleFarmInputChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  variant="filled"
                  name="averageTreeAge"
                  label="Average tree age"
                  value={newFarm.averageTreeAge}
                  onChange={handleFarmInputChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>
          ) : (
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
                  {farm.totalSize}
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
                  {farm.numberOfTrees}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.700" }}
                  fontWeight={600}
                >
                  Verticals
                </Typography>
                <Typography variant="body2" sx={{ color: "common.black" }}>
                  {farm.verticals}
                </Typography>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography
                  variant="body1"
                  sx={{ color: "grey.700" }}
                  fontWeight={600}
                >
                  Spacing (m)
                </Typography>
                <Typography variant="body2" sx={{ color: "common.black" }}>
                  {farm.spacing}
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
                  {farm.averageTreeAge}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      ))}

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
