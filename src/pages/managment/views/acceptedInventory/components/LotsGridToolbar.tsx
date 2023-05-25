import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarProps,
} from "@mui/x-data-grid-pro";
import { Box, Button, Divider } from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import MergeTypeIcon from "@mui/icons-material/MergeType";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import DirectionsBoatFilledOutlinedIcon from "@mui/icons-material/DirectionsBoatFilledOutlined";

export const LotsGridToolbar = (props: LotsGridToolbarProps) => {
  const { rowsSelection } = props;
  return (
    <GridToolbarContainer sx={{ justifyContent: "end", m: 2 }}>
      {rowsSelection.length ? (
        <>
          <Box display="flex" columnGap={2}>
            <Button variant="text" startIcon={<SettingsSuggestIcon />}>
              PROCESS
            </Button>
            <Button variant="text" startIcon={<MergeTypeIcon />}>
              COMBINE , PROCESS & SPLIT
            </Button>
            <Button variant="text" startIcon={<CoffeeOutlinedIcon />}>
              SAMPLE
            </Button>
            <Button
              variant="text"
              startIcon={<DirectionsBoatFilledOutlinedIcon />}
            >
              SELL
            </Button>
          </Box>
          <Divider orientation="vertical" />
        </>
      ) : (
        <></>
      )}
      <GridToolbarExport variant="text" />
      <GridToolbarColumnsButton variant="text" />
    </GridToolbarContainer>
  );
};

type LotsGridToolbarProps = GridToolbarProps & {
  rowsSelection: string[];
};
