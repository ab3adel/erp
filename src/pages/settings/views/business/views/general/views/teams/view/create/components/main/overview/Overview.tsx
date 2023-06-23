import { Box, Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PermissionOverview from "../../../../../components/PermissionOverview";
import { modulesImages } from "@/shared/enums/modules-images";
// import { Actions } from "@/shared/enums/actions";
import { Abilities } from "../../../../../hooks/useAbilities";
import _ from "lodash";

interface OverviewProps {
  email: string;
  organiztionName: string;
  selectedAbilities: Abilities[];
}

const Overview: FunctionComponent<OverviewProps> = (props) => {
  const { email, organiztionName, selectedAbilities } = props;

  return (
    <>
      <Box mt={8}>
        <Box textAlign="center">
          <Box my={1}>
            <MailOutlineRoundedIcon sx={{ fontSize: 40 }} color="action" />
          </Box>
          <Box my={1}>
            <Typography variant="h6" fontWeight={500}>
              Invite <span style={{ fontWeight: 700 }}>{email}</span> to{" "}
              <span style={{ fontWeight: 700 }}>{organiztionName}</span>
            </Typography>
          </Box>
          <Box my={1}>
            <Typography
              variant="body1"
              fontWeight={400}
              color="text.secondary"
              fontSize={16}
            >
              Send your teammate a warm welcome and everything they need for a
              smooth start in the M·Cultivo app.
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box my={4}>
        <Divider />
      </Box>

      <Box textAlign="center">
        <Typography
          variant="h6"
          fontSize={20}
          fontWeight={500}
          color="#242828DE"
        >
          Review Permissions
        </Typography>

        <Box display="flex" justifyContent="center">
          <Box display="inline-block" minWidth={560}>
            {Object.entries(_.groupBy(selectedAbilities, "category")).map(
              (GroupedCategories) => (
                <Box mt={4} maxWidth={560} width="100%">
                  <PermissionOverview
                    icon={modulesImages[GroupedCategories[0]]}
                    label={GroupedCategories[0]}
                    permissionList={Object.entries(
                      _.groupBy(GroupedCategories[1], "subcategory")
                    ).map((item) => ({
                      label: item[0],
                      actions: item[1].map((item) => item.title),
                    }))}
                  />
                </Box>
              )
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Overview;
