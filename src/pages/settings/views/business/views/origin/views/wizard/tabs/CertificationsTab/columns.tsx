import { useMemo } from "react";
import { GridColDef } from "@mui/x-data-grid-pro";
import { CellCheckBox } from "../../components/EditableDatagrid";
import { Certification, WithId } from "../../../../types";

export type Row = WithId<Partial<Certification & { active: boolean }>>;

export const useCertificationsColumns = () =>
  useMemo<GridColDef<Row>[]>(
    () => [
      {
        headerName: "Certification",
        field: "name",
        flex: 1,
        sortable: false,
      },
      {
        headerName: "Whatsapp Code",
        field: "code",
        flex: 1,
        sortable: false,
      },
      {
        headerName: "Active",
        field: "active",
        flex: 1,
        sortable: false,
        editable: true,
        renderCell: (params) => (params.value ? "Yes" : "No"),
        renderEditCell: (params) => <CellCheckBox params={params} />,
      },
    ],
    []
  );
