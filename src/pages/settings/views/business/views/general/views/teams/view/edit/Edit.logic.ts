import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useAbilities } from "../../hooks/useAbilities";
import _ from "lodash";
import { useUpdateMemberutation } from "../../hooks/useUpdateMember";
import { useUpdateUserAbilities } from "../../hooks/useUpdateUserAbilitiesMutation";

export const useLogic = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleNavigateToTeams = () => {
    navigate("/settings/business/general/teams");
  };

  const [email, setEmail] = useState("");

  const { data: userToEdit } = useUser({ id: parseInt(id ?? "") });

  const [mutateUpdateUser, { loading: loadingUpdateMember }] =
    useUpdateMemberutation();

  const [mutateUpdateUserAbilites, { loading: loadingUpdateAbilites }] =
    useUpdateUserAbilities();

  const loading = loadingUpdateAbilites || loadingUpdateMember;

  useEffect(() => {
    if (userToEdit) {
      setEmail(userToEdit?.user.email);
      setAbilitiesValue(userToEdit.user.abilities.map((item) => item.id));
    }
  }, [userToEdit]);

  //   const [mutateAddMember, { loading: loadingAddMember }] =
  //     useAddTeamMemberMutation();

  const { data: AvailableAbilites } = useAbilities({ first: 1000, page: 1 });

  const [abilitiesValue, setAbilitiesValue] = useState<string[]>([]);

  const [shownPanels, setShownPanels] = useState<string[]>([]);

  const [showCustomizationPanels, setShowCustomizationPanels] = useState(false);

  const handleShowCustomizationPanelsChange = () =>
    setShowCustomizationPanels((status) => !status);

  const groupedAbilites = _.groupBy(
    AvailableAbilites?.abilities.data,
    (item) => item.category
  );

  const handleConfirm = () => {
    if (email && id) {
      if (email !== userToEdit?.user.email) {
        mutateUpdateUser({ variables: { email, id: parseInt(id) } });
      }
      mutateUpdateUserAbilites({
        variables: {
          memberId: parseInt(id),
          abilityIds: abilitiesValue.map((item) => parseInt(item)),
        },
      });
    }
  };

  const isValidEmail = yup.string().email().required().isValidSync(email);

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
        abilitiesValue.includes(item.id)
      ),
    [abilitiesValue, AvailableAbilites]
  );

  const permissionValue =
    abilitiesValue?.length ==
      AvailableAbilites?.abilities.data.filter((item) => item.title === "read")
        .length && selectedAbilites?.every((item) => item.title === "read")
      ? 3
      : abilitiesValue?.length ==
          AvailableAbilites?.abilities.data.filter(
            (item) => item.title === "read" || item.title === "write"
          ).length &&
        selectedAbilites?.every(
          (item) => item.title === "read" || item.title === "write"
        )
      ? 2
      : abilitiesValue?.length == AvailableAbilites?.abilities.data.length
      ? 1
      : abilitiesValue?.length === 0
      ? 4
      : 5;

  const handlePermissionInputChange = (value: number) => {
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

  const isChangedForm =
    email !== userToEdit?.user.email ||
    userToEdit?.user.abilities.some(
      (item) => !abilitiesValue.includes(item.id)
    ) ||
    abilitiesValue.some(
      (item) =>
        !userToEdit?.user.abilities.map((item) => item.id).includes(item)
    );

  // ----------------------------------------------------------------------------

  return {
    email,
    handleNavigateToTeams,
    shownPanels,
    setEmail,
    handleConfirm,
    isValidEmail,
    groupedAbilites,
    abilitiesValue,
    handleShowPanelChange,
    handleAbilitesChange,
    showCustomizationPanels,
    handleShowCustomizationPanelsChange,
    selectedAbilites,
    handlePermissionInputChange,
    permissionValue,
    loading,
    isChangedForm,
  };
};
