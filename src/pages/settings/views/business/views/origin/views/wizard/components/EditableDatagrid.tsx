import { CalendarToday, Cancel, DeleteOutline } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Checkbox,
  Chip,
  IconButton,
  ListItem,
  MenuItem,
  TextField,
  Tooltip,
  createFilterOptions,
} from "@mui/material";
import {
  GridRenderCellParams,
  DataGridPro,
  GridRowParams,
  GridRowId,
  GridColDef,
  useGridApiContext,
  GridRowModes,
  // GridRowModes,
} from "@mui/x-data-grid-pro";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";

type Option = { label: string; value: string };
const filter = createFilterOptions<Option>();

type CreatableAutoCompleteProps = {
  options: Option[];
  defalutValue: string[];
  label: string;
};

const CreatableAutoComplete = ({
  options,
  defalutValue,
  label,
}: CreatableAutoCompleteProps) => {
  const [value, setValue] = useState<Option[]>(
    defalutValue?.map((val) => ({ label: val, value: val }))
  );

  return (
    <Autocomplete
      multiple
      fullWidth
      freeSolo
      selectOnFocus
      clearOnBlur
      limitTags={2}
      ChipProps={{
        variant: "outlined",
        sx: {
          minWidth: 50,
          "& .MuiChip-label": {
            paddingInline: 0.5,
          },
          "& .MuiChip-deleteIcon": {
            margin: 0,
            fontSize: 15,
          },
        },
      }}
      options={[{ label: "Select or create an option", value: "" }, ...options]}
      getOptionDisabled={(option) => !option.value}
      renderOption={(props, option) => (
        <ListItem
          {...props}
          sx={{
            fontSize: !option.value ? 12 : 16,
          }}
        >
          {option.label}
        </ListItem>
      )}
      value={value}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
          // placeholder="Favorites"

          // TODO: allow spaces
          // TODO: enter to confirm
          // onKeyDown={(e) => {
          //   if (e.key === "Enter" && e.target.value) {
          //     const text = e.target.value;
          //     if (text.includes(" ")) {
          //       const vinnos = text.split(" ");
          //       setAutoCompleteValue(autoCompleteValue.concat(vinnos));
          //     } else {
          //       setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
          //     }
          //   }
          // }}
        />
      )}
      onChange={(_, newValue) => {
        // if (typeof newValue === "string") return;
        const newValues = newValue
          .filter((val) => (val as Option).value)
          .map((val) => ({
            ...(val as Option),
            label: (val as Option).value,
          }));
        setValue(newValues);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;

        const isExisting = options.some((option) =>
          option.label.includes(inputValue)
        );

        if (inputValue !== "" && !isExisting) {
          filtered.push({
            value: inputValue,
            label: `Create ${inputValue}`,
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === "string") return option;
        return option.label;
      }}
    />
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const CellTextField = ({
  params,
  label = params.colDef.headerName,
  placeholder = "",
}: {
  params: GridRenderCellParams;
  label?: string;
  placeholder?: string;
}) => {
  const apiRef = useGridApiContext();
  const { id, value, field } = params;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    apiRef.current.setEditCellValue({ id, field, value: e.target.value });
    apiRef.current.updateRows([{ id, [field]: e.target.value }]);
  };

  const handleRef = (element: HTMLInputElement) => {
    if (element) {
      const input = element.querySelector<HTMLInputElement>(
        `input[value="${value}"]`
      );
      input?.focus();
    }
  };

  return (
    <TextField
      variant="filled"
      ref={handleRef}
      defaultValue={params.value}
      fullWidth
      label={label}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

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
export const cellAutocomplete = (
  params: GridRenderCellParams,
  label = "Select Options",
  options: string[]
) => (
  <CreatableAutoComplete
    options={options.map((opt) => ({ label: opt, value: opt }))}
    defalutValue={params.value}
    label={label}
  />
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
  <Tooltip
    title="Delete"
    arrow
    sx={{
      "&:hover > *": {
        color: "primary.main",
      },
    }}
  >
    <IconButton onClick={() => onClick(params.id)} disableRipple={false}>
      <DeleteOutline
        sx={{
          color: "#2428288F",
          fontSize: "1.5rem",
        }}
      />
    </IconButton>
  </Tooltip>,
];
type DataGridProps = {
  columns: GridColDef[];
  rows: readonly Record<string, unknown>[];
  datagridRef?: React.MutableRefObject<GridApiPro> | undefined;
};

const DataGrid = ({ columns, rows, datagridRef }: DataGridProps) => (
  <DataGridPro
    sx={{
      "& .MuiDataGrid-row:hover": {
        // backgroundColor: "none",
      },
      // --> this styling will make the last row without border
      // "& .MuiDataGrid-row:last-child > *": {
      //   border: "none",
      // },
    }}
    editMode="row"
    rowModesModel={rows.reduce(
      (acc, row) => ({
        ...acc,
        [row.id]: { mode: GridRowModes.Edit },
      }),
      {}
    )}
    rowHeight={80}
    columns={columns}
    apiRef={datagridRef}
    disableRowSelectionOnClick
    hideFooter
    rows={rows}
  />
);

export default DataGrid;
