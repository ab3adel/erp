import {
  GridColDef,
  GridEditInputCell,
  GridRenderEditCellParams,
  GridCellProps,
  GridRenderCellParams,
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
import { Account, Contact } from "@/shared/models/models";
import { accountTypes } from "../graphql/queries/AccountTypesQuery";
import { isAccountCellEditable } from "../utils/isAccountCellEditable";
import { CurrencyEditCell } from "../components/CurrencyEditCell";
import { AccountFarmSizeUoMEditSelect } from "../components/AccountFarmSizeUoMEditSelect";
import { AccountFarmSpacingUoMEditSelect } from "../components/AccountFarmSpacingUoMEditSelect";
import { updateContactValueSetter } from "../utils/updateContactValueSetter";

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

function DataGridAccountCell(props: GridRenderCellParams) {
  const type = props.row.accountType?.category.toLowerCase() as string;
  const isEditable = isAccountCellEditable(type, props.field);

  if (isEditable) {
    return (
      <Typography
        variant="body2"
        sx={{
          fontWeight: 400,
          color: "common.black",
        }}
      >
        {props.value}
      </Typography>
    );
  } else {
    return <Box width="100%" height="100%" sx={{ bgcolor: "#e7e7e761" }} />;
  }
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
      valueSetter: ({ row, value = "" }) => {
        const [firstName, lastName] = value.split(" ");
        return {
          ...row,
          first_name: firstName,
          last_name: lastName,
          name: value,
        };
      },
    },
    {
      field: "id",
      headerName: "Account ID",
      width: 150,
      group: "account details",
      renderCell: (params) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            color: params.id === "new" ? "grey.500" : "common.black",
          }}
        >
          {params?.row?.id}
        </Typography>
      ),
      align: "right",
    },
    {
      field: "accountType",
      headerName: "Account Type",
      width: 150,
      group: "account details",
      editable: true,
      type: "singleSelect",
      renderEditCell: (props) => <AccountTypesEditSelect {...props} />,
      renderCell: ({ row }) => (
        <Typography
          variant="body2"
          sx={{
            fontWeight: 400,
            color: "common.black",
          }}
        >
          {row.accountType?.name}
        </Typography>
      ),
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
      renderCell: (props) => <DataGridAccountCell {...props} />,
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
      field: "farms.farm_name",
      headerName: "Farm Name",
      width: 150,
      editable: false,
      group: "farm details",
      renderCell: (props) => (
        <DataGridAccountCell
          {...props}
          value={props.row.farms?.[0]?.farm_name}
        />
      ),
    },
    {
      field: "farms.average_tree_age",
      headerName: "Average Tree Age",
      width: 150,
      editable: false,
      group: "farm details",
      renderCell: (props) => (
        <DataGridAccountCell
          {...props}
          value={props.row.farms?.[0]?.average_tree_age}
        />
      ),
    },
    {
      field: "farms.size",
      headerName: "Size",
      width: 150,
      editable: false,
      group: "farm details",
      renderCell: (props) => (
        <DataGridAccountCell {...props} value={props.row.farms?.[0]?.size} />
      ),
    },
    {
      field: "farmSizeUom",
      headerName: "Farm Size UoM",
      width: 150,
      editable: true,
      group: "location details",
      renderCell: (props) => (
        <DataGridAccountCell {...props} value={props.row.farmSizeUom?.name} />
      ),
      renderEditCell: (props) => <AccountFarmSizeUoMEditSelect {...props} />,
    },
    {
      field: "farms.spacing",
      headerName: "Spacing",
      width: 150,
      editable: false,
      group: "farm details",
      renderCell: (props) => (
        <DataGridAccountCell {...props} value={props.row.farms?.[0]?.spacing} />
      ),
    },
    {
      field: "farmSpacingUom",
      headerName: "Spacing UoM",
      width: 150,
      editable: true,
      group: "location details",
      renderCell: (props) => (
        <DataGridAccountCell
          {...props}
          value={props.row.farmSpacingUom?.name}
        />
      ),
      renderEditCell: (props) => <AccountFarmSpacingUoMEditSelect {...props} />,
    },
    {
      field: "farms.varietal",
      headerName: "varietals",
      width: 150,
      editable: false,
      group: "farm details",
      renderCell: (props) => (
        <DataGridAccountCell
          {...props}
          value={props.row.farms?.[0]?.varietal?.name}
        />
      ),
    },
    {
      field: "region",
      headerName: "Zone",
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
      field: "education_level",
      headerName: "Education Level",
      width: 150,
      group: "personal details",
      editable: true,
      type: "singleSelect",
      valueOptions: [
        "unknown",
        "primary",
        "secondary",
        "university",
        "technical",
        "training",
        "none",
      ],
      renderCell: (props) => <DataGridAccountCell {...props} />,
    },
    {
      field: "marital_status",
      headerName: "Marital Status",
      width: 150,
      editable: true,
      group: "personal details",
      type: "singleSelect",
      valueOptions: ["single", "married", "widow", "unknown"],
      renderCell: (props) => <DataGridAccountCell {...props} />,
    },
    {
      field: "members_in_household",
      headerName: "Members In Household",
      group: "personal details",
      renderCell: (props) => <DataGridAccountCell {...props} />,
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "total_children",
      headerName: "Total Children",
      group: "personal details",
      renderCell: (props) => <DataGridAccountCell {...props} />,
      width: 150,
      editable: true,
      type: "number",
    },
    {
      field: "read_literate",
      headerName: "Read Literate",
      width: 150,
      group: "personal details",
      renderCell: (props) => <DataGridAccountCell {...props} />,
      editable: true,
      type: "singleSelect",
      valueOptions: ["yes", "some", "no"],
    },

    {
      field: "write_literate",
      headerName: "Write Literate",
      width: 150,
      renderCell: (props) => <DataGridAccountCell {...props} />,
      group: "personal details",
      editable: true,
      type: "singleSelect",
      valueOptions: ["yes", "some", "no"],
    },
    {
      field: "subscription_type",
      headerName: "Subscription Type",
      width: 150,
      editable: true,
      group: "contact details",
      type: "singleSelect",
      valueOptions: ["sms", "whatsapp", "none"],
      renderCell: (props) => <DataGridAccountCell {...props} />,
    },
    {
      field: "mobileNumber",
      headerName: "Mobile Number",
      width: 150,
      group: "contact details",
      editable: true,
      valueGetter: ({ row }) =>
        row.contacts?.find(
          (contact) => contact.type === "phone" && contact.is_primary
        )?.contact_info,
      valueSetter: (params) =>
        updateContactValueSetter({ ...params, type: "phone" }),
    },
    {
      field: "whatsapp",
      headerName: "Whatsapp",
      width: 150,
      group: "contact details",
      editable: true,
      valueGetter: ({ row }) =>
        row.contacts?.find((contact) => contact.type === "whatsapp")
          ?.contact_info,
      valueSetter: (params) =>
        updateContactValueSetter({ ...params, type: "whatsapp" }),
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      group: "contact details",
      editable: true,
      valueGetter: ({ row }) =>
        row.contacts?.find((contact) => contact.type === "email")?.contact_info,
      valueSetter: (params) =>
        updateContactValueSetter({ ...params, type: "email" }),
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
      valueGetter: ({ row }) => row.country?.name,
    },
    {
      field: "currency",
      headerName: "Currency",
      width: 200,
      editable: true,
      valueGetter: ({ row }) => row.currency?.name,
      renderEditCell: (params) => <CurrencyEditCell {...params} />,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
      type: "singleSelect",
      group: "personal details",
      valueOptions: ["female", "male", "other", "unknown"],
      editable: true,
      renderCell: (props) => <DataGridAccountCell {...props} />,
    },
    {
      field: "tags",
      headerName: "Tags",
      width: 300,
      renderCell: ({ row }) =>
        row.tags?.map((tag) => (
          <Chip
            label={tag.name}
            key={tag.id}
            sx={{ bgcolor: tag.color, color: "common.white" }}
          />
        )),
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
