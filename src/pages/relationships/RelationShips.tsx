import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import { CurvedTabs } from "@/shared/components/curvedTabs/CurvedTabs";
import { Outlet, useNavigate } from "react-router-dom";
import { CurvedTabsContainer } from "@/shared/components/curvedTabs/CurvedTabsContainer";
import { useQuery } from "@apollo/client";
import { accountsCustomViews } from "./views/accounts/graphql/queries/AccountsCustomViews";
import { UserView } from "@/shared/models/models";

export const RelationShips = () => {
  const navigate = useNavigate();

  const { data, loading } = useQuery<
    {
      views_user: UserView[];
    },
    {
      module: string;
    }
  >(accountsCustomViews, {
    variables: {
      module: "relationships",
    },
  });

  if (loading) {
    return (
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box position="relative">
      <Typography
        fontSize={34}
        fontWeight={700}
        sx={{ color: "common.black", mb: 4 }}
      >
        RelationShips
      </Typography>
      <CurvedTabs
        tabs={[
          {
            label: "Accounts",
            value: "/relationships/accounts",
            primary: true,
          },
          ...(data?.views_user.map((view) => ({
            id: Number(view.id),
            label: view.name,
            value: `/relationships/customview/?tab=${view.name}`,
            columnVisibiltyModel: JSON.parse(view.query || "{}")
              .columnVisibiltyModel,
            columns: JSON.parse(view.query || "{}").columns,
            filterModel: JSON.parse(view.query || "{}").filterModel,
          })) || []),
        ]}
        localStorageKey="relationships"
        onDelete={() => navigate("/relationships/accounts")}
      />
      <CurvedTabsContainer>
        <Outlet />
      </CurvedTabsContainer>
    </Box>
  );
};
