import { Button, Menu, MenuItem } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { useLogic } from "./ExportAction.logic";

const ExportActions = () => {
  const { anchorEl, setAnchorEl, clearAnchor } = useLogic();

  const actions = [
    { label: "Download .xls", onClick: () => null },
    { label: "Download .csv", onClick: () => null },
    { label: "Download .pdf", onClick: () => null },
  ];

  return (
    <>
      <Button
        variant="text"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        startIcon={<FileDownloadOutlinedIcon />}
      >
        Export
      </Button>
      <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={clearAnchor}>
        {actions.map((item) => (
          <MenuItem key={item.label} onClick={item.onClick}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ExportActions;
