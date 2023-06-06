import {
  GridColDef,
  GridEditInputCell,
  GridRenderEditCellParams,
} from "@mui/x-data-grid-pro";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import { Box, Typography, Link, Chip, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountRow } from "../types";
import { AccountTypesEditSelect } from "../components/AccountTypesEditSelect";
import { useLazyQuery } from "@apollo/client";
import { accountNameSearch } from "../graphql/queries/AccountNameSearch";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  let color:
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "inherit";

  if (props.value < 30) {
    color = "error";
  } else if (props.value > 30 && props.value <= 70) {
    color = "warning";
  } else {
    color = "success";
  }

  return (
    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color={color} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export const useAccountsTableColumns = () => {
  const navigate = useNavigate();
  const [queryFn] = useLazyQuery<
    {
      accounts: {
        data: { id: string }[];
      };
    },
    {
      name: string;
    }
  >(accountNameSearch);

  const columns: GridColDef<AccountRow>[] = [
    {
      field: "name",
      headerName: "Account Name",
      width: 150,
      editable: true,
      renderCell: (params) => (
        <Link
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
          onClick={() => {
            if (params.row.id.toString() !== "new") {
              navigate(
                `/${params.id}/${params.row?.type?.toLowerCase()}-profile`
              );
            }
          }}
        >
          {params.value}
        </Link>
      ),
      preProcessEditCellProps: async (params) => {
        const value = params.props.value;
        console.log("HI");
        const { data } = await queryFn({
          variables: {
            name: value,
          },
        });
        let hasError = false;

        if (data) {
          hasError = data?.accounts.data.length > 0;
        }

        return {
          ...params.props,
          error: hasError ? "The user is already exists" : "",
        };
      },
      renderEditCell: (props: GridRenderEditCellParams) => (
        <Tooltip
          open={!!props.error}
          title={props.error}
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: props.error ? "error.main" : "inherit",
              },
            },
          }}
        >
          <GridEditInputCell {...props} />
        </Tooltip>
      ),
    },
    {
      field: "id",
      headerName: "Account ID",
      width: 150,
      renderCell: (params) => (
        <Typography
          sx={{
            color: params.id === "new" ? "grey.500" : "initial",
          }}
        >
          {params?.row?.id}
        </Typography>
      ),
    },
    {
      field: "type",
      headerName: "Account Type",
      width: 150,
      editable: true,
      renderEditCell: (props) => <AccountTypesEditSelect {...props} />,
      valueGetter: ({ value }) => {
        return typeof value === "object" ? value.category : value;
      },
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      editable: true,
    },
    { field: "last_name", headerName: "Last Name", width: 150, editable: true },
    {
      field: "government_id",
      headerName: "Goverment ID",
      width: 150,
      editable: true,
    },
    {
      field: "contacts",
      headerName: "Mobile Number",
      width: 150,
      valueGetter: (params) => {
        const value = params.row.contacts
          ? params.row.contacts[0]?.contact_info
          : "";
        return value;
      },
    },
    { field: "district", headerName: "District", width: 150, editable: true },
    {
      field: "address1",
      headerName: "Address 1",
      width: 150,
      editable: true,
    },

    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      width: 150,
      editable: true,
      renderCell: ({ value }) => {
        let color:
          | "primary"
          | "success"
          | "error"
          | "warning"
          | "info"
          | "default"
          | "secondary" = "primary";
        switch (value) {
          case "active": {
            color = "success";
            break;
          }
          case "inactive": {
            color = "error";
            break;
          }
          case "pending": {
            color = "warning";
            break;
          }
          case "archived": {
            color = "info";
            break;
          }
          default: {
            color = "primary";
            break;
          }
        }
        return <Chip label={value} color={color} />;
      },
      valueOptions: ["active", "inactive", "pending", "archived"],
    },
    {
      field: "completeness",
      headerName: "Completeness",
      type: "number",
      width: 200,
      renderCell: ({ value }) => <LinearProgressWithLabel value={value || 0} />,
    },
  ];
  return columns;
};
