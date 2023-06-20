import { FunctionComponent } from "react";
import { Box, Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { generatePermissionText } from "@/shared/utils/PermissionTextGenerate";
import { capitalizeEachWord } from "@/shared/utils/capitalizeEachWord";

interface PermissionOverviewProps {
  label?: string;
  icon?: string;
  permissionList?: { label: string; actions: string[] }[];
}

const PermissionOverview: FunctionComponent<PermissionOverviewProps> = (
  props
) => {
  const { icon, label, permissionList } = props;

  return (
    <Box>
      <Box bgcolor={grey["50"]} p={2}>
        <Box display="flex" gap={2}>
          <img src={icon} alt={icon} />
          <Typography variant="body2" color="text.primary">
            {capitalizeEachWord(label ?? "")}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderBottomWidth: "medium" }} />
      {permissionList?.map((item) => (
        <Box key={item.label}>
          <Box display="flex" justifyContent="space-between" p={2}>
            <Typography variant="body2" color="text.primary">
              {capitalizeEachWord(item.label)}
            </Typography>

            <Typography color="text.secondary">
              {capitalizeEachWord(generatePermissionText(item.actions as any))}
            </Typography>
          </Box>
          <Divider />
        </Box>
      ))}
    </Box>
  );
};

export default PermissionOverview;
