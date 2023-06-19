import { Components, Theme } from "@mui/material";

export const DataGridStylesOverrides: Components<Theme>["MuiDataGrid"] = {
  defaultProps: {
    density: "standard",
    rowHeight: 48,
    columnHeaderHeight: 58,
  },
  styleOverrides: {
    root: {
      borderRadius: "0px 0px 6px 6px",
      border: "none",
    },
    columnSeparator: {
      display: "none",
    },
    columnHeaders: ({ theme }) => ({
      backgroundColor: `${theme.palette.grey[50]}`,
      borderBottom: ` 1px solid rgba(0, 0, 0, 0.12)`,
      color: theme.palette.text.secondary,
      boxShadow: "none",
    }),
    columnHeader: {
      outline: "none !important",
    },
    columnHeaderTitle: ({ theme }) => ({
      color: theme.palette.text.secondary,
      textTransform: "none",
      fontFamily: "Lato",
      fontStyle: "normal",
      // FIXME: should this be always 700 ??
      fontWeight: 500,
      fontSize: "14px",
    }),
    cellContent: ({ theme }) => ({
      color: `${theme.palette.common.black}`,
      fontWeight: "regular",
      ...theme.typography.body2,
    }),
    cell: {
      outline: "none !important",
    },
    virtualScrollerContent: {
      background: "#FFFFFF",
    },
    virtualScrollerRenderZone: {
      "& .MuiDataGrid-row.Mui-selected ,.MuiDataGrid-row:hover ": {
        background: "#008E8F14",
      },
    },
    footerContainer: {
      border: "none",
    },
  },
};
