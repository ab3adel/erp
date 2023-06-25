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

  const { data: AvailableAbilites } = useAbilities({ first: 1000, page: 1 });

  const [abilitiesValue, setAbilitiesValue] = useState<string[]>([]);

  const [shownPanels, setShownPanels] = useState<string[]>([]);

  const [email, setEmail] = useState("");

  const { data: userToEdit } = useUser({ id: parseInt(id ?? "") });

  const [mutateUpdateUser, { loading: loadingUpdateMember }] =
    useUpdateMemberutation({ disableSnackbar: true });

  const [mutateUpdateUserAbilites, { loading: loadingUpdateAbilites }] =
    useUpdateUserAbilities();

  const loading = loadingUpdateAbilites || loadingUpdateMember;

  useEffect(() => {
    if (userToEdit) {
      setEmail(userToEdit?.user.email);
      setAbilitiesValue(userToEdit.user.abilities.map((item) => item.id));
    }
  }, [userToEdit]);

  useEffect(() => {
    if (AvailableAbilites?.abilities.data)
      setShownPanels(
        AvailableAbilites?.abilities.data
          .filter((item) => abilitiesValue.includes(item.id))
          .map((item) => item.category)
      );
  }, [AvailableAbilites?.abilities.data, abilitiesValue]);

  //   const [mutateAddMember, { loading: loadingAddMember }] =
  //     useAddTeamMemberMutation();

  const [showCustomizationPanels, setShowCustomizationPanels] = useState(true);

  const handleShowCustomizationPanelsChange = () => {
    setShowCustomizationPanels((status) => !status);
    // PushQueries(
    //   "showCustomizationPanels",
    //   showCustomizationPanels ? "false" : "true"
    // );
  };

  const handleRedirectToTeamsTable = () =>
    navigate("/settings/business/general/teams");

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
          abilityIds: proccessedSelectedAbilities.map((item) => parseInt(item)),
        },
      }).then(() => handleRedirectToTeamsTable());
    }
  };

  const isValidEmail = yup.string().email().required().isValidSync(email);

  // const PushQueries = (key: string, value: string[] | string) => {
  //   const modulesSequence = Array.isArray(value) ? value.join(",") : value;

  //   const queryParams = new URLSearchParams();

  //   queryParams.append(key, modulesSequence);

  //   navigate({
  //     search: `?${createSearchParams({ key: "test", key_2: "test 1" })}`,
  //   });
  // };

  const handleShowPanelChange = (cateogry: string, status: boolean) => {
    setShownPanels((panels) => {
      const newState = status
        ? [...panels, cateogry]
        : panels.filter((item) => item !== cateogry);

      return newState;
    });
  };

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
      : proccessedSelectedAbilities?.length ==
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

  const isChangedForm =
    email !== userToEdit?.user.email ||
    userToEdit?.user.abilities.some(
      (item) => !proccessedSelectedAbilities.includes(item.id)
    ) ||
    proccessedSelectedAbilities.some(
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
    abilitiesValue: proccessedSelectedAbilities,
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
