import { useSelectedOrganiztion } from "@/global/states/selectedOrganizations";
import { useUserOrganiaztions } from "@/shared/hooks/graphql/queries/useUserOrganizations/useUserOrganizations";
import React, { useEffect, useMemo, useState } from "react";
import * as yup from "yup";
import { useAbilities } from "../../hooks/useAbilities";
import _ from "lodash";
import { useNavigate } from "react-router-dom";
import { useAddTeamMemberMutation } from "../../hooks/useAddTeamMemberMutation";

export const useLogic = () => {
  const navigrate = useNavigate();

  const [mutateAddMember, { loading: loadingAddMember }] =
    useAddTeamMemberMutation();

  const [currentStep, setStep] = React.useState(0);

  const { id: selectedOrgId } = useSelectedOrganiztion();

  const { data: UserOrganiaztionsData } = useUserOrganiaztions();

  const { data: AvailableAbilites } = useAbilities({ first: 1000, page: 1 });

  const [abilitiesValue, setAbilitiesValue] = useState<string[]>([]);

  const [shownPanels, setShownPanels] = useState<string[]>([]);

  const [showCustomizationPanels, setShowCustomizationPanels] = useState(false);

  const handleShowCustomizationPanelsChange = () =>
    setShowCustomizationPanels((status) => !status);

  const proccessedSelectedAbilities = useMemo(
    () =>
      AvailableAbilites?.abilities.data
        .filter(
          (item) =>
            abilitiesValue.includes(item.id) &&
            shownPanels.includes(item.category)
        )
        .map((item) => item.id) ?? [],
    [AvailableAbilites, abilitiesValue, shownPanels]
  );

  // const abilitiesIdListToExclude = AvailableAbilites?.abilities.data
  //   .filter((item) => item.category !== "Offer List")
  //   .map((item) => item.id);

  const groupedAbilites = _.groupBy(
    AvailableAbilites?.abilities.data,
    (item) => item.category
  );

  const [email, setEmail] = useState("");

  const handleCancel = () => {
    handleGoBack();
  };

  const handleRedirectToTeamsTable = () =>
    navigrate("/settings/business/general/teams");

  const handleBack = () => currentStep > 0 && setStep((step) => step - 1);

  const handleConfirm = () => {
    if (currentStep < 2) setStep((step) => step + 1);

    if (currentStep == 2) {
      mutateAddMember({
        variables: {
          email,
          abilities: proccessedSelectedAbilities.map((item) => parseInt(item)),
        },
      }).then(() => setStep((step) => step + 1));
    }

    if (currentStep === 3) handleRedirectToTeamsTable();
  };

  const isValidEmail = yup.string().email().required().isValidSync(email);

  const handleGoBack = () => navigrate(-1);

  // default select read options
  useEffect(() => {
    if (AvailableAbilites?.abilities.data)
      setAbilitiesValue(
        AvailableAbilites?.abilities.data
          .filter((item) => item.title === "read")
          .map((item) => item.id)
      );
  }, [AvailableAbilites]);

  const organiztionName = useMemo(
    () =>
      UserOrganiaztionsData?.userOrganizations.data.find(
        (item) => item.id === selectedOrgId
      )?.company_name,
    [UserOrganiaztionsData, selectedOrgId]
  );

  const handleShowPanelChange = (cateogry: string, status: boolean) =>
    setShownPanels((panels) =>
      status
        ? [...panels, cateogry]
        : panels.filter((item) => item !== cateogry)
    );

  const handleAbilitesChange = (subcategory: string, newValues: string[]) => {
    const currentSubCategoryAbilitiesIds = AvailableAbilites?.abilities.data
      .filter((item) => item.subcategory === subcategory)
      .map((item) => item.id);

    setAbilitiesValue((abilities) => [
      ...abilities.filter(
        (item) => !currentSubCategoryAbilitiesIds?.includes(item)
      ),
      ...newValues,
    ]);
  };

  const selectedAbilites = useMemo(
    () =>
      AvailableAbilites?.abilities.data.filter((item) =>
        proccessedSelectedAbilities.includes(item.id)
      ),
    [proccessedSelectedAbilities, AvailableAbilites]
  );

  const permissionValue =
    proccessedSelectedAbilities?.length ==
      AvailableAbilites?.abilities.data.filter((item) => item.title === "read")
        .length && selectedAbilites?.every((item) => item.title === "read")
      ? 3
      : proccessedSelectedAbilities?.length ==
          AvailableAbilites?.abilities.data.filter(
            (item) => item.title === "read" || item.title === "write"
          ).length &&
        selectedAbilites?.every(
          (item) => item.title === "read" || item.title === "write"
        )
      ? 2
      : proccessedSelectedAbilities?.length ===
        AvailableAbilites?.abilities.data.length
      ? 1
      : proccessedSelectedAbilities?.length === 0
      ? 4
      : 5;

  const handlePermissionInputChange = (value: number) => {
    setShownPanels(
      AvailableAbilites?.abilities.data.map((item) => item.category) ?? []
    );
    if (value === 1)
      setAbilitiesValue(
        AvailableAbilites?.abilities.data.map((item) => item.id) ?? []
      );

    if (value == 2)
      setAbilitiesValue(
        AvailableAbilites?.abilities.data
          .filter((item) => item.title === "read" || item.title === "write")
          .map((item) => item.id) ?? []
      );

    if (value === 3)
      setAbilitiesValue(
        AvailableAbilites?.abilities.data
          .filter((item) => item.title === "read")
          .map((item) => item.id) ?? []
      );

    if (value === 4) setAbilitiesValue([]);
  };

  return {
    organiztionName,
    email,
    setEmail,
    currentStep,
    handleConfirm,
    handleBack,
    handleCancel,
    isValidEmail,
    groupedAbilites,
    // abilitiesValue,
    abilitiesValue: proccessedSelectedAbilities,
    shownPanels,
    handleShowPanelChange,
    handleAbilitesChange,
    showCustomizationPanels,
    handleShowCustomizationPanelsChange,
    selectedAbilites,
    handlePermissionInputChange,
    permissionValue,
    loadingAddMember,
  };
};
