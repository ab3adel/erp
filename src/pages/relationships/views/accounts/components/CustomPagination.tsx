import { GridPagination } from "@mui/x-data-grid-pro";
import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";

function Pagination({
  page,
  onPageChange,
  className,
  ...props
}: TablePaginationProps) {
  const pageCount = Math.ceil(props.count / props.rowsPerPage);
  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
}

export function CustomPagination(props: any) {
  return <GridPagination ActionsComponent={Pagination} {...props} />;
}
