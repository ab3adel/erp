import { DataGrid } from "@mui/x-data-grid";
import { useLotDataGridColumns } from "../hooks/useLotDataGridColumns";
import { useLotsDataGridRows } from "../hooks/useLotsDataGridRows";

function LotsGrid(props: LotsGridProps) {
  const columns = useLotDataGridColumns();
  const { rows, loading } = useLotsDataGridRows();

  return (
    <div style={{ width: "100%" }}>
      <div style={{ height: 420, width: "100%" }}>
        <DataGrid
          columns={columns}
          loading={loading}
          rows={rows}
          checkboxSelection
        />
      </div>
    </div>
  );
}

type LotsGridProps = {
  type: "cherry" | "pachment" | "green";
};
export default LotsGrid;
