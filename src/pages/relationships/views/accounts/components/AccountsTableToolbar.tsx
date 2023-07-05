import {
  GridToolbarContainer,
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
  MenuItem,
  Tooltip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import {
  DropDownMenu,
  GenericDialog,
  useDialog,
  useGenericMutation,
} from "@/shared";
import { deleteAccount } from "../graphql/mutations/deleteAccount";
import { Action } from "../hooks/useAddAccount";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { useEffect, useRef, useState } from "react";
import { TagsSelect } from "@/shared/components/tags/TagsSelect";
import { saveAccount } from "../graphql/mutations/saveAccount";
import { AccountInput } from "../types";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useDownloadReport } from "@/shared/hooks/useDownloadReport";
import { Account, Tag } from "@/shared/models/models";
import { isAccountRowValid } from "../utils/isAccountRowValid";
import { remvoeTagRelation } from "../graphql/mutations/removeTagRelation";
import { useSnackbar } from "notistack";
import { capitalizeEachWord } from "@/shared/utils/capitalizeEachWord";

export const AccountsTableToolbar = (props: AccountsTableToolbarProps) => {
  const { rowsSelection, dispatch, isRowAdded } = props;
  const { openDialog, closeDialog, isDialogOpen } =
    useDialog<"deleteAccount">();
  const controller = useRef(new AbortController());

  const [removeAccount] = useGenericMutation<
    { __typename: string },
    { id: string }
  >(deleteAccount, {
    refetchQueries: ["AccountsQuery"],
    context: {
      signal: controller.current.signal,
    },
  });
  const [isMerged, setIsMerged] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const apiRef = useGridApiContext();
  const selectedRows = apiRef.current.getSelectedRows().values();
  const selectedRow = selectedRows.next().value;

  const newRow = apiRef.current.getRowModels().get("new") as Account;
  const isDisabled = !isAccountRowValid(newRow);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [removeTag] = useGenericMutation(remvoeTagRelation, {
    refetchQueries: ["AccountsQuery"],
  });

  const [edit] = useGenericMutation<
    {
      updateOrInsertAccount: {
        id: number;
      };
    },
    { input: AccountInput }
  >(saveAccount, { refetchQueries: ["AccountsQuery"] });
  const columns = apiRef.current
    .getAllColumns()
    .map((clm) => clm.field)
    .filter((c) => !["__check__", "type", "mobileNumber"].includes(c));

  const { downloadReport } = useDownloadReport();

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

  const handleAddTag = (tag: Tag) => {
    edit({
      variables: {
        input: {
          id: Number(selectedRow.id),
          tags: [
            ...selectedRow.tags.map((tag: Tag) => ({
              ...tag,
              id: Number(tag.id),
            })),
            { ...tag, id: Number(tag.id) },
          ],
        },
      },
    });
  };

  const handleDeleteTag = (tag: Tag) => {
    removeTag({
      variables: {
        ids: [Number(tag.id)],
        accountId: selectedRow.id,
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
            <TagsSelect
              anchorEl={anchorEl}
              open={Boolean(selectedRow)}
              selectedTags={selectedRow?.tags}
              onRemoveTag={handleDeleteTag}
              onSelectTag={handleAddTag}
            />
            {rowsSelection.length !== 1 ? (
              <Tooltip
                title="Please select only one account"
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
                    startIcon={<DeleteIcon />}
                    disabled={rowsSelection.length !== 1}
                    onClick={() => {
                      openDialog("deleteAccount");
                    }}
                  >
                    DELETE
                  </Button>
                </span>
              </Tooltip>
            ) : (
              <Button
                variant="text"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  openDialog("deleteAccount");
                }}
              >
                DELETE
              </Button>
            )}
          </Box>
          <Divider orientation="vertical" />
        </>
      ) : (
        <></>
      )}
      {isRowAdded ? (
        <>
          <Box display="flex" columnGap={2}>
            {isDisabled ? (
              <Tooltip
                title={`Please fill Account Name , Account type , Address1 , Country ${
                  newRow.accountType?.category === "farmer"
                    ? ", Subscription Type"
                    : ""
                }  , Currency  fields`}
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
            ) : (
              <Button
                variant="text"
                startIcon={<SaveIcon />}
                onClick={() => {
                  dispatch({ type: "SAVE_ACCOUNT" });
                }}
              >
                Save row
              </Button>
            )}
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

      {!isRowAdded && (
        <Button
          variant="text"
          startIcon={<SaveIcon />}
          onClick={() => {
            props.openDialog("save_view");
          }}
        >
          Save view
        </Button>
      )}
      <Divider orientation="vertical" />
      <DropDownMenu
        button={(props) => (
          <Button
            {...props}
            variant="text"
            startIcon={<FileDownloadOutlinedIcon />}
          >
            Export
          </Button>
        )}
      >
        <MenuItem
          onClick={() => {
            downloadReport("excel", {
              columns,
              table_name: "accounts",
            });
          }}
        >
          Download .xls
        </MenuItem>
        <MenuItem
          onClick={() => {
            downloadReport("csv", {
              columns,
              table_name: "accounts",
            });
          }}
        >
          Download .csv
        </MenuItem>
        <MenuItem
          onClick={() => {
            downloadReport("pdf", {
              columns,
              table_name: "accounts",
            });
          }}
        >
          Download .pdf
        </MenuItem>
      </DropDownMenu>
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
        onSubmit={() => {
          enqueueSnackbar(
            `Account ${capitalizeEachWord(selectedRow.name)} ID ${
              selectedRow.id
            } deleted.`,
            {
              variant: "default",
              autoHideDuration: 3000,
              anchorOrigin: {
                horizontal: "center",
                vertical: "bottom",
              },
              onClose: () => {
                handleDeleteAccount();
              },
              action: () => (
                <Button
                  color="inherit"
                  variant="text"
                  onClick={() => {
                    controller.current.abort();
                    closeSnackbar();
                  }}
                  sx={{ zIndex: 1 }}
                >
                  UNDO
                </Button>
              ),
            }
          );
          closeDialog();
        }}
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
                helperText={`Merge “${capitalizeEachWord(
                  selectedRow.name
                )}” ID ${selectedRow.id} with this account`}
              />
            )}
          </Box>
        </Typography>
      </GenericDialog>
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
