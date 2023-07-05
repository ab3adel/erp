import { useState } from "react";
import { GridApiPro } from "@mui/x-data-grid-pro/models/gridApiPro";
import { DatePicker } from "@mui/x-date-pickers";
import {
  CalendarToday as CalendarTodayIcon,
  DeleteOutline as DeleteOutlineIcon,
} from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  IconButton,
  ListItem,
  MenuItem,
  TextField,
  Tooltip,
  createFilterOptions,
} from "@mui/material";
import {
  GridRenderEditCellParams,
  DataGridPro,
  GridRowParams,
  GridRowId,
  GridColDef,
  useGridApiContext,
} from "@mui/x-data-grid-pro";

type Option = { label: string; value: string };
const filter = createFilterOptions<Option>();

type CreatableAutoCompleteProps = {
  options: Option[];
  value: string[] | null;
  label: string;
  placeholder?: string;
  onChange: (newValues: string[]) => void;
};

const CreatableAutoComplete = ({
  options,
  label,
  value,
  placeholder = "",
  onChange,
}: CreatableAutoCompleteProps) => {
  const [currentValue, setCurrentValue] = useState<Option[]>(
    value?.map((val) => ({ label: val, value: val })) ?? []
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
      value={currentValue}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="filled"
          label={label}
          placeholder={placeholder}

          // TODO: enter to confirm
          // onKeyDown={(e) => {
          //   // if (e.key === "Enter" && e.target.value) {
          //   //   // const text = e.target.value;
          //   //   // if (text.includes(" ")) {
          //   //   //   const vinnos = text.split(" ");
          //   //   //   setAutoCompleteValue(autoCompleteValue.concat(vinnos));
          //   //   // } else {
          //   //   //   setAutoCompleteValue(autoCompleteValue.concat(e.target.value));
          //   //   // }

          //   }
          // }}
        />
      )}
      onChange={(_, newValue) => {
        const newValues = newValue
          .filter((val) => (val as Option).value)
          .map((val) => ({
            ...(val as Option),
            label: (val as Option).value,
          }));
        onChange(newValues.map((val) => val.value));
        setCurrentValue(newValues);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;

        const isExisting = options.some(
          (option) => option.label === inputValue
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
        return option.value;
      }}
    />
  );
};

export const CellTextField = ({
  params,
  label = params.colDef.headerName,
  placeholder = "",
  type
}: {
  params: GridRenderEditCellParams;
  label?: string;
  placeholder?: string;
  type?: string
}) => {
  const apiRef = useGridApiContext();
  const { id, value, field } = params;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    apiRef.current.setEditCellValue({ id, field, value: e.target.value });
  };

  return (
    <TextField
      variant="filled"
      value={value ?? ""}
      fullWidth
      label={label}
      onChange={onChange}
      placeholder={placeholder}
      type={type ? type : 'text'}
    />
  );
};

export const CellSelect = ({
  params,
  label = "Select Options",
  options,
}: {
  params: GridRenderEditCellParams;
  label?: string;
  options?: string[];
}) => {
  const apiRef = useGridApiContext();
  const { id, value, field } = params;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    apiRef.current.setEditCellValue({ id, field, value: e.target.value });
  };

  return (
    <TextField
      variant="filled"
      label={label}
      select
      fullWidth
      value={value ?? ""}
      onChange={onChange}
    >
      {(options ?? []).map((opt) => (
        <MenuItem key={opt} value={opt}>
          {opt}
        </MenuItem>
      ))}
    </TextField>
  );
};

export const CellAutocomplete = ({
  params,
  label = "Select Options",
  options,
}: {
  params: GridRenderEditCellParams;
  label?: string;
  options?: string[];
}) => {
  const apiRef = useGridApiContext();
  const { id, value, field } = params;

  const onChange = (newValues: string[]) => {
    apiRef.current.setEditCellValue({ id, field, value: newValues });
  };

  return (
    <CreatableAutoComplete
      options={(options ?? []).map((opt) => ({ label: opt, value: opt }))}
      value={value ?? null}
      label={label}
      onChange={onChange}
    />
  );
};

export const CellCheckBox = ({
  params,
}: {
  params: GridRenderEditCellParams;
}) => {
  const apiRef = useGridApiContext();
  const { id, value, field } = params;

  const onChange = (_: any, checked: boolean) => {
    apiRef.current.setEditCellValue({ id, field, value: checked });
  };

  return <Checkbox checked={!!value} onChange={onChange} />;
};

export const CellDatePicker = ({
  params,
  label = "Select Options",
}: {
  params: GridRenderEditCellParams;
  label?: string;
}) => {
  const apiRef = useGridApiContext();
  const { id, value, field } = params;

  const onChange = (value: any) => {
    apiRef.current.setEditCellValue({ id, field, value });
  };

  return (
    <DatePicker
      slotProps={{
        textField: { variant: "filled" },
      }}
      slots={{
        openPickerIcon: () => (
          <CalendarTodayIcon sx={{ color: "primary.main" }} />
        ),
      }}
      label={label}
      defaultValue={value}
      onChange={onChange}
    />
  );
};

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
      <DeleteOutlineIcon
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
  processRowUpdate?: ((newRow: any, oldRow: any) => any) | undefined;
};

const DataGrid = ({
  columns,
  rows,
  processRowUpdate,
  datagridRef,
}: DataGridProps) => (
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
    autoHeight
    rowHeight={80}
    disableRowSelectionOnClick
    hideFooter
    columns={columns}
    rows={rows}
    apiRef={datagridRef}
    editMode="row"
    processRowUpdate={processRowUpdate}
    onProcessRowUpdateError={console.log}
  />
);

export default DataGrid;
