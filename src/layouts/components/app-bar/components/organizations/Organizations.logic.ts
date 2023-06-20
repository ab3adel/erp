import {
  useSelectedOrganiztion,
  useSelectedTenentId,
} from "@/global/states/selectedOrganizations";
import { useUserOrganiaztions } from "@/shared/hooks/graphql/queries/useUserOrganizations/useUserOrganizations";
import React, { useEffect } from "react";

export const useLogic = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { data: organiztions } = useUserOrganiaztions();

  const handleSetAnchorEl = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const selectedOrganiztionId = useSelectedOrganiztion((state) => state.id);

  const setSelectedOrg = useSelectedOrganiztion((state) => state.set);
  const setSelectedTenentId = useSelectedTenentId((state) => state.set);

  useEffect(() => {
    if (organiztions?.userOrganizations.data[0]?.id) {
      setSelectedOrg(organiztions?.userOrganizations?.data[0]?.id);
      setSelectedTenentId(organiztions?.userOrganizations?.data[0]?.tenant.id);
    }
  }, [organiztions?.userOrganizations.data]);

  const handleCloseMenu = () => setAnchorEl(null);

  return {
    anchorEl,
    handleSetAnchorEl,
    handleCloseMenu,
    organiztions,
    selectedOrganiztionId,
    setSelectedOrg,
    setSelectedTenentId,
  };
};
