import { GridColDef, GridColumnVisibilityModel } from "@mui/x-data-grid-pro";
import { GenericDialog, GenericDialogProps } from "./GenericDialog";
import React from "react";
import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
  InputBase,
} from "@mui/material";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import DragIndicatorOutlined from "@mui/icons-material/DragIndicatorOutlined";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

const DragHandle = SortableHandle(() => (
  <DragIndicatorOutlined
    sx={{
      position: "absolute",
      color: "#008E8F80",
      left: "5px",
      cursor: "move",
    }}
  />
));

const SortableColumnItem = SortableElement<{
  column: GridColDef;
  setState: (action: GridColDef[]) => void;
  state: GridColDef[];
}>(
  ({
    column,
    setState,
    state,
  }: {
    column: GridColDef;
    setState: (action: GridColDef[]) => void;
    state: GridColDef[];
  }) => (
    <ListItem
      sx={{
        border: "1px solid #E0E0E0",
        mb: 1,
        zIndex: 100000,
      }}
      dense
      secondaryAction={
        <IconButton
          aria-label="Remove"
          onClick={() =>
            setState(state.filter((c) => c.field !== column.field))
          }
        >
          <CloseIcon />
        </IconButton>
      }
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "white" }}>
          <DragHandle />
        </Avatar>
      </ListItemAvatar>

      <ListItemText>
        <Typography variant="body1" fontWeight={600}>
          {column.headerName}
        </Typography>
      </ListItemText>
    </ListItem>
  )
);

const SortableColumnList = SortableContainer<{ children: React.ReactNode }>(
  ({ children }: { children: React.ReactNode }) => <div>{children}</div>
);

export const ManageColumnsPanel = ({
  columns,
  setColumns,
  setVisibiltyModel,
  visibiltyModel,
  ...props
}: ManageColumnsPanelProps) => {
  const [state, setState] = React.useState(columns);
  const [search, setSearch] = React.useState("");
  const filterdColumns = columns.filter((column) =>
    column.headerName?.toLowerCase().includes(search.toLowerCase())
  );
  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    setState((state) => {
      const newState = [...state];
      newState.splice(newIndex, 0, newState.splice(oldIndex, 1)[0]);
      return newState;
    });
  };

  return (
    <GenericDialog
      {...props}
      maxWidth="sm"
      color="#fff"
      hideCloseButton={false}
      fullWidth
      dialog={{
        title: "Manage columns",
        closeButton: {
          label: "Cancel",
          color: "inherit",
        },
        submitButton: {
          label: "Apply Columns",
          onClick: () => {
            setColumns(state);
            setVisibiltyModel(
              columns.reduce<GridColumnVisibilityModel>(
                (acc, column) => ({
                  ...acc,
                  [column.field]: state.some((c) => c.field === column.field),
                }),

                {}
              )
            );
            props.onClose();
          },
        },
      }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs>
          <InputBase
            sx={{ mb: 2 }}
            placeholder="Search columns"
            inputProps={{ "aria-label": "search columns" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <SearchIcon
                sx={{
                  color: "text.disabled",
                  mr: 1,
                }}
              />
            }
          />
          <FormControl variant="standard">
            <FormLabel sx={{ color: "text.secondary" }}>Columns</FormLabel>
            <FormGroup>
              {filterdColumns.map((column) => (
                <FormControlLabel
                  key={column.field}
                  control={
                    <Checkbox
                      checked={state.some((c) => c.field === column.field)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setState([...state, column]);
                        } else {
                          setState(
                            state.filter((c) => c.field !== column.field)
                          );
                        }
                      }}
                    />
                  }
                  label={column.headerName}
                />
              ))}
            </FormGroup>
          </FormControl>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs sx={{ overflowY: "auto" }}>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{ color: "common.black", mb: 2 }}
          >
            Reorder selected columns
          </Typography>
          <SortableColumnList axis="y" onSortEnd={onSortEnd} useDragHandle>
            {state.map((column, index) => (
              <SortableColumnItem
                key={column.field}
                column={column}
                index={index}
                setState={setState}
                state={state}
              />
            ))}
          </SortableColumnList>
        </Grid>
      </Grid>
    </GenericDialog>
  );
};

export type ManageColumnsPanelProps = Pick<
  GenericDialogProps,
  "open" | "onClose"
> & {
  columns: GridColDef[];
  setColumns: (action: GridColDef[]) => void;
  visibiltyModel: GridColumnVisibilityModel | undefined;
  setVisibiltyModel: (action: GridColumnVisibilityModel) => void;
};
