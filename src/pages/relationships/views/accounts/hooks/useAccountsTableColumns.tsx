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
import { AccountTypesEditSelect } from "../components/AccountTypesEditSelect";
import { useLazyQuery, useQuery } from "@apollo/client";
import { accountNameSearch } from "../graphql/queries/AccountNameSearch";
import { AccountsCountryEditSelect } from "../components/AccountsCountryEditSelect";
import { Account } from "@/shared/models/models";
import { accountTypes } from "../graphql/queries/AccountTypesQuery";

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
  const { data } = useQuery<{
    accountTypes: { data: Account["accountType"][] };
  }>(accountTypes);

  const [queryFn] = useLazyQuery<
    {
      accounts: {
        data: { id: string }[];
      };
    },
    {
      filter: Partial<Account>;
    }
  >(accountNameSearch);

  const columns: Columns[] = [
    {
      field: "name",
      headerName: "Account Name",
      width: 150,
      editable: true,
      group: "account details",
      renderCell: (params) => (
        <Link
          sx={{
            textDecoration: "none",
            color: "primary.main",
          }}
          onClick={() => {
            if (params.row.id.toString() !== "new") {
              navigate(
                `/${
                  params.id
                }/${params.row?.accountType?.category?.toLowerCase()}-profile`
              );
            }
          }}
        >
          {params.value}
        </Link>
      ),
      preProcessEditCellProps: async (params) => {
        const value = params.props.value;
        const { data } = await queryFn({
          variables: {
            filter: {
              name: value,
            },
          },
        });
        let hasError = false;

        if (data) {
          hasError = data?.accounts.data.length > 0;
        }

        return {
          ...params.props,
          hasError: hasError ? "The user is already exists" : "",
        };
      },
      renderEditCell: ({ hasError, ...props }: GridRenderEditCellParams) => (
        <Tooltip
          open={!!hasError}
          title={hasError}
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: hasError ? "error.main" : "inherit",
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
      group: "account details",
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
      field: "accountType",
      headerName: "Account Type",
      width: 150,
      group: "account details",
      editable: true,
      type: "singleSelect",
      renderEditCell: (props) => <AccountTypesEditSelect {...props} />,
      valueGetter: (params) => {
        return params.row.accountType?.name;
      },
      valueOptions: data?.accountTypes.data.map(
        (data) => data?.name as string
      ) || ["buyer", "farmer", "plot", "agent"],
    },
    {
      field: "first_name",
      headerName: "First Name",
      width: 150,
      group: "personal details",
      editable: true,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      width: 150,
      editable: true,
      group: "personal details",
    },
    {
      field: "government_id",
      headerName: "Goverment ID",
      width: 150,
      editable: true,
      group: "location details",
      preProcessEditCellProps: async (params) => {
        const value = params.props.value;
        const { data } = await queryFn({
          variables: {
            filter: {
              government_id: value,
            },
          },
        });
        let hasError = false;

        if (data) {
          hasError = data?.accounts.data.length > 0;
        }

        return {
          ...params.props,
          hasError: hasError ? "Government Id is already exists" : "",
        };
      },
      renderEditCell: ({ hasError, ...props }: GridRenderEditCellParams) => (
        <Tooltip
          open={!!hasError}
          title={hasError}
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: hasError ? "error.main" : "inherit",
              },
            },
          }}
        >
          <GridEditInputCell {...props} />
        </Tooltip>
      ),
    },
    {
      field: "language",
      headerName: "Language",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "region",
      headerName: "Region",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "state",
      headerName: "State",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "unit_of_measurement",
      headerName: "UoM",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "education_level",
      headerName: "Education Level",
      width: 150,
      group: "personal details",
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "Unknown",
        "Primary",
        "Secondary",
        "University",
        "Technical",
        "training",
        "None",
      ],
    },
    {
      field: "marital_status",
      headerName: "Marital Status",
      width: 150,
      editable: true,
      group: "personal details",
      type: "singleSelect",
      valueOptions: ["Single", "Married", "Widow", "Unknown"],
    },
    {
      field: "members_in_household",
      headerName: "Members In Household",
      group: "personal details",

      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "total_children",
      headerName: "Total Children",
      group: "personal details",

      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "read_literate",
      headerName: "Read Literate",
      width: 150,
      group: "personal details",

      editable: true,
      type: "singleSelect",
      valueOptions: ["Yes", "Some", "No"],
    },

    {
      field: "write_literate",
      headerName: "Write Literate",
      width: 150,
      group: "personal details",

      editable: true,
      type: "singleSelect",
      valueOptions: ["Yes", "Some", "No"],
    },
    {
      field: "subscription_type",
      headerName: "Subscription Type",
      width: 150,
      editable: true,
      group: "contact details",
      type: "singleSelect",
      valueOptions: ["SMS", "Whatsapp", "None"],
    },

    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 150,
      group: "contact details",
    },
    {
      field: "district",
      headerName: "District",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "address1",
      headerName: "Address 1",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "address2",
      headerName: "Address 2",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "date_of_birth",
      headerName: "Birth Date",
      width: 150,
      group: "personal details",
      type: "date",
      editable: true,
      valueGetter: ({ value }) => (value ? new Date(value) : ""),
    },
    {
      field: "city",
      headerName: "City",
      width: 150,
      editable: true,
      group: "location details",
    },
    {
      field: "country",
      headerName: "Country",
      width: 200,
      editable: true,
      renderEditCell: (props) => <AccountsCountryEditSelect {...props} />,
      group: "location details",
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 200,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      type: "singleSelect",
      group: "personal details",
      valueOptions: ["female", "male", "other", "unknown"],
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "singleSelect",
      width: 150,
      group: "account details",
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
      group: "account details",
      renderCell: ({ value }) => <LinearProgressWithLabel value={value || 0} />,
    },
  ];
  return columns;
};

type Columns = GridColDef<Account> & {
  group?: string;
};
