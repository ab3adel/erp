import { CalendarToday, Cancel, DeleteOutline } from "@mui/icons-material";
import { Box, Checkbox, Chip, MenuItem, TextField } from "@mui/material";
import {
  GridRenderCellParams,
  DataGridPro,
  GridActionsCellItem,
  GridRowParams,
  GridRowId,
  GridColDef,
  // GridRowModes,
} from "@mui/x-data-grid-pro";
import { DatePicker } from "@mui/x-date-pickers";

// eslint-disable-next-line react-refresh/only-export-components
export const cellTextField = (
  params: GridRenderCellParams,
  label = params.colDef.headerName,
  placeholder = ""
) => (
  <TextField
    variant="filled"
    defaultValue={params.value}
    fullWidth
    label={label}
    placeholder={placeholder}
  />
);

// eslint-disable-next-line react-refresh/only-export-components
export const cellSelect = (
  params: GridRenderCellParams,
  label = "Select Options",
  options?: { options?: string[]; multiple?: boolean }
) => (
  <TextField
    variant="filled"
    label={label}
    select
    SelectProps={{
      multiple: !!options?.multiple,
      ...(options?.multiple && {
        renderValue: (selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {(selected as string[]).map((value) => (
              <Chip
                variant="outlined"
                clickable
                label={value}
                key={value}
                deleteIcon={<Cancel onMouseDown={(e) => e.stopPropagation()} />}
                onDelete={(e) => console.log(e, value)}
              />
            ))}
          </Box>
        ),
      }),
    }}
    fullWidth
    defaultValue={params.value}
  >
    {!options?.options ? (
      <MenuItem value="">Empty</MenuItem>
    ) : (
      options?.options?.map((opt) => <MenuItem value={opt}>{opt}</MenuItem>)
    )}
  </TextField>
);

// eslint-disable-next-line react-refresh/only-export-components
export const cellCheckBox = (params: GridRenderCellParams) => (
  <Checkbox checked={params.value} />
);

// eslint-disable-next-line react-refresh/only-export-components
export const cellDatePicker = (
  params: GridRenderCellParams,
  label = params.colDef.headerName
) => (
  <DatePicker
    slotProps={{
      textField: { variant: "filled" },
    }}
    slots={{
      openPickerIcon: () => <CalendarToday sx={{ color: "primary.main" }} />,
    }}
    defaultValue={params.value}
    label={label}
  />
);

// eslint-disable-next-line react-refresh/only-export-components
export const cellDeleteAction = (
  params: GridRowParams,
  onClick: (id: GridRowId) => void
) => [
  <GridActionsCellItem
    icon={<DeleteOutline sx={{ color: "#2428288F" }} />}
    onClick={() => onClick(params.id)}
    label="Delete"
  />,
];
type DataGridProps = {
  columns: GridColDef[];
  rows: readonly Record<string, unknown>[];
};

const DataGrid = ({ columns, rows }: DataGridProps) => (
  <DataGridPro
    sx={{
      // --> this styling will make the last row without border
      // "& .MuiDataGrid-row:last-child > *": {
      //   border: "none",
      // },
    }}
    // editMode="row"
    // --> in case we wanna use the edit mode
    // --> this will turn edit mode for all rows
    // rowModesModel={rows.reduce(
    //   (acc, row) => ({
    //     ...acc,
    //     [row.id]: { mode: GridRowModes.Edit },
    //   }),
    //   {}
    // )}
    rowHeight={80}
    columns={columns}
    disableRowSelectionOnClick
    hideFooter
    rows={rows}
  />
);

export default DataGrid;
