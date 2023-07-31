import { ManageColumnsPanel } from "@/shared/components/ManageColumnsPanel";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import { Button } from "@mui/material";
import { useLogic } from "./CustomizeCoulmns.logic";
import CustomizeIcon from '@/assets/images/customize_icon.svg'
const CustomizeColumns = () => {
  const {
    mapColumnsToGroups,
    handleClose,
    showColumnsPanel,
    handleOpen,
    setVisibilityModel,
    visibilityModel,
    handleSetColumnsOrder,
  } = useLogic();

  return (
    <>
      <Button variant="text" startIcon={< img src={CustomizeIcon} />} onClick={handleOpen}>
        Customize
      </Button>
      <ManageColumnsPanel
        columns={mapColumnsToGroups}
        onClose={handleClose}
        open={showColumnsPanel}
        setColumns={(fields) =>
          handleSetColumnsOrder(fields.map((item) => item.field))
        }
        setVisibiltyModel={setVisibilityModel}
        visibiltyModel={visibilityModel}
      />
    </>
  );
};

export default CustomizeColumns;
