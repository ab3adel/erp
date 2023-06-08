import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  IconButton,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";
import SaveIcon from "@mui/icons-material/SaveOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import _ from "lodash";
import { useGenericMutation } from "@/shared";
import { saveFarm } from "./graphql/mutations/SaveFarm";
import { FarmInput } from "./types";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Account } from "@/shared/models/models";
import { accountProfile } from "../../graphql/queries/accountProfile";
import { deleteFarm } from "./graphql/mutations/deleteFarm";

type Farm = {
  id: string;
  name: string;
  totalSize: number;
  numberOfTrees: number;
  verticals: "";
  spacing: number;
  averageTreeAge: number;
};

export const AccountFarms = () => {
  const [farms, setFarms] = useState<Farm[]>([]);

  const [newFarm, setNewFarm] = useState<Farm>({
    id: "",
    name: "",
    totalSize: 0,
    numberOfTrees: 0,
    verticals: "",
    spacing: 0,
    averageTreeAge: 0,
  });
  const { id } = useParams();
  useQuery<{ account: Account }, { id: number }>(accountProfile, {
    variables: {
      id: Number(id),
    },
    onCompleted: (data) => {
      setFarms(
        (data.account.farms?.map((farm) => ({
          averageTreeAge: farm.average_tree_age,
          id: farm.id,
          name: farm.farm_name,
          numberOfTrees: farm.average_tree_age,
          spacing: farm.spacing,
          totalSize: farm.size,
          verticals: farm.varietals,
        })) || []) as Farm[]
      );
    },
  });
  const [selectedFarm, setSelectedFarm] = useState<string>();
  const [mutate] = useGenericMutation<{
    farms: FarmInput[];
    id: number;
  }>(saveFarm, {
    refetchQueries: ["accountProfile"],
  });
  const [deleteFarmFn] = useMutation<
    unknown,
    {
      id: number;
    }
  >(deleteFarm, {
    refetchQueries: ["accountProfile"],
  });

  const handleAddFarm = () => {
    const id = _.uniqueId("newFarm");

    setFarms((prevFarms) => [{ ...newFarm, id }, ...prevFarms]);
    setNewFarm({
      name: "",
      totalSize: 0,
      numberOfTrees: 0,
      verticals: "",
      spacing: 0,
      averageTreeAge: 0,
      id,
    });
    setSelectedFarm(id);
  };

  const handleDeleteFarm = (id: string) => {
    setFarms((prevFarms) => prevFarms.filter((farm) => farm.id !== id));
    deleteFarmFn({
      variables: {
        id: Number(id),
      },
    });
  };

  const handleEditFarm = (id: string) => {
    setSelectedFarm(id);
    setNewFarm(farms.find((farm) => farm.id === id)!);
  };

  const handleSaveFarm = () => {
    setSelectedFarm(undefined);
    const farmInput: FarmInput = {
      ...(!String(newFarm.id).includes("newFarm") && {
        id: parseInt(newFarm.id),
      }),
      average_tree_age: Number(newFarm.averageTreeAge) || 0,
      farm_name: newFarm.name,
      size: Number(newFarm.totalSize) || 0,
      spacing: Number(newFarm.spacing) || 0,
      varietals: newFarm.verticals,
    };

    mutate({
      variables: {
        farms: [farmInput],
        id: Number(id),
      },
    });
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
    <Box p={3} minHeight="70vh">
      <Box display="flex" justifyContent="right" my={1}>
        <Button startIcon={<AddIcon />} onClick={handleAddFarm}>
          ADD NEW FARM
        </Button>
      </Box>
      {!farms.length && (
        <Box
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography>There are no farms</Typography>
        </Box>
      )}
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
                <Tooltip title="Save">
                  <IconButton onClick={handleSaveFarm}>
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDeleteFarm(farm.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => {
                    handleEditFarm(farm.id);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
                  type="number"
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
          <Divider sx={{ mt: 3 }} />
          <Box display="flex" mt={1} justifyContent="space-between">
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              Documents
            </Typography>
            <Tooltip title="Upload">
              <IconButton>
                <FileUploadIcon sx={{ color: "grey.600" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}
    </Box>
  );
};
