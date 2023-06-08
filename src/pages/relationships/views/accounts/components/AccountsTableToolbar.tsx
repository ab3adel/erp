import {
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarProps,
  useGridApiContext,
} from "@mui/x-data-grid-pro";
import {
  Box,
  Button,
  Divider,
  Snackbar,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
  Alert,
  Tooltip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { GenericDialog, useDialog, useGenericMutation } from "@/shared";
import { deleteAccount } from "../graphql/mutations/deleteAccount";
import { Action } from "../hooks/useAddAccount";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { useEffect, useState } from "react";
import { TagsSelect } from "@/shared/components/TagsSelect";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { AccountInput } from "../types";

const tags = [
  {
    id: "1",
    label: "Tag 1",
    color: "#3f51b5",
  },
  {
    id: "2",
    label: "Tag 2",
    color: "#f50057",
  },
  {
    id: "3",
    label: "Tag 3",
    color: "#4caf50",
  },
];

export const AccountsTableToolbar = (props: AccountsTableToolbarProps) => {
  const { rowsSelection, dispatch, isRowAdded } = props;
  const { openDialog, closeDialog, isDialogOpen } =
    useDialog<"deleteAccount">();
  const [removeAccount] = useGenericMutation<
    { __typename: string },
    { id: string }
  >(deleteAccount, { refetchQueries: ["AccountsQuery"] });
  const [isMerged, setIsMerged] = useState(false);
  const [filterdTags, setFilteredTags] = useState(tags);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const apiRef = useGridApiContext();
  const selectedRows = apiRef.current.getSelectedRows().values();
  const selectedRow = selectedRows.next().value;
  const newRow = apiRef.current.getRowModels().get("new");
  const isDisabled = !newRow?.name || !newRow?.address1 || !newRow?.type;
  const [edit] = useGenericMutation<
    {
      updateOrInsertAccount: {
        id: number;
      };
    },
    { input: AccountInput }
  >(saveAccount, { refetchQueries: ["AccountsQuery"] });

  useEffect(() => {
    setAnchorEl(null);
  }, [selectedRow?.id]);

  const handleTagButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleDeleteAccount = () => {
    const [id] = rowsSelection;

    removeAccount({
      variables: { id },
      onCompleted: () => {
        closeDialog();
      },
    });
  };

  return (
    <GridToolbarContainer sx={{ justifyContent: "end", m: 2 }}>
      {rowsSelection.length && !isRowAdded ? (
        <>
          <Box display="flex" columnGap={2}>
            {selectedRow?.status === "pending" && (
              <Button
                variant="text"
                startIcon={<DoneIcon />}
                disabled={rowsSelection.length !== 1}
                onClick={() => {
                  edit({
                    variables: {
                      input: {
                        id: selectedRow.id,
                        status: "active",
                      },
                    },
                  });
                }}
              >
                APPROVE
              </Button>
            )}
            <Button
              variant="text"
              startIcon={<LocalOfferIcon />}
              onClick={handleTagButtonClick}
            >
              TAG
            </Button>
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              disabled={rowsSelection.length !== 1}
              onClick={() => {
                openDialog("deleteAccount");
              }}
            >
              DELETE
            </Button>
          </Box>
          <Divider orientation="vertical" />
        </>
      ) : (
        <></>
      )}
      {isRowAdded ? (
        <>
          <Box display="flex" columnGap={2}>
            <Tooltip
              open={isDisabled}
              title="Please fill Account Name , Account type , Address1 fields"
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: "error.main",
                    color: "common.white",
                  },
                },
              }}
            >
              <span>
                <Button
                  variant="text"
                  startIcon={<SaveIcon />}
                  onClick={() => {
                    dispatch({ type: "SAVE_ACCOUNT" });
                  }}
                  disabled={isDisabled}
                >
                  Save row
                </Button>
              </span>
            </Tooltip>
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={() => {
                dispatch({ type: "CANCEL_ACCOUNT" });
              }}
            >
              Cancel
            </Button>
          </Box>
          <Divider orientation="vertical" />
        </>
      ) : (
        <></>
      )}

      <Button
        variant="text"
        startIcon={<SaveIcon />}
        onClick={() => {
          props.openDialog("save_view");
        }}
      >
        Save view
      </Button>
      <Divider orientation="vertical" />
      <GridToolbarExport variant="text" />
      <Button
        variant="text"
        startIcon={<ViewWeekIcon />}
        onClick={() => {
          props.setOpenColumnsDialog(true);
        }}
      >
        Customize
      </Button>
      <GenericDialog
        open={isDialogOpen("deleteAccount")}
        onClose={closeDialog}
        maxWidth="xs"
        dialog={{
          title: "Delete & Merge Account",
          submitButton: {
            label: "Delete",
            variant: "text",
            color: "error",
          },
          closeButton: {
            label: "Cancel",
            variant: "text",
            color: "inherit",
          },
          dialogTitleSx: {
            bgcolor: (theme) => `${theme.palette.error.main} !important`,
          },
        }}
        onSubmit={handleDeleteAccount}
      >
        <Typography variant="body1" sx={{ color: "common.black" }}>
          There are existing transactions and surveys attached to the account.
          Would you like to merge this account to an existing one?
          <Box>
            <FormControlLabel
              control={<Switch />}
              label="Merge"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                setIsMerged(target.checked);
              }}
              checked={isMerged}
            />
            {isMerged && (
              <TextField
                variant="filled"
                sx={{ width: "100%" }}
                label="Select Account"
              />
            )}
          </Box>
        </Typography>
      </GenericDialog>
      <TagsSelect
        anchorEl={anchorEl}
        onDelete={(tag) => {
          setFilteredTags(filterdTags.filter((t) => t.id !== tag.id));
        }}
        onSearch={(search) => {
          setFilteredTags(
            tags.filter((tag) => tag.label.toLowerCase().includes(search))
          );
        }}
        tags={filterdTags}
      />

      <Snackbar
        open={showSnackbar}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          severity="error"
          onClose={() => setShowSnackbar(false)}
          action={
            <Button
              color="inherit"
              size="small"
              variant="text"
              onClick={() => setShowSnackbar(false)}
            >
              UNDO
            </Button>
          }
        >
          Account deleted
        </Alert>
      </Snackbar>
    </GridToolbarContainer>
  );
};

type AccountsTableToolbarProps = GridToolbarProps & {
  rowsSelection: string[];
  dispatch: (action: Action) => void;
  isRowAdded: boolean;
  openDialog: (dialog: "save_view") => void;
  setOpenColumnsDialog: (open: boolean) => void;
};
