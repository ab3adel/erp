import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useUser } from "../../hooks/useUser";
import { useAbilities } from "../../hooks/useAbilities";
import _, { uniq } from "lodash";
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

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const shownPanelsQuery = queryParams.get("shownPanels");

  useEffect(() => {
    if (shownPanelsQuery)
      setShownPanels((panelsState) =>
        uniq([...panelsState, ...(shownPanelsQuery?.split(",") ?? [])])
      );
  }, [shownPanelsQuery]);

  // console.log(shownPan, "shown");

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

  //   const [mutateAddMember, { loading: loadingAddMember }] =
  //     useAddTeamMemberMutation();

  const showCustomizationPanelsQuery = queryParams.get(
    "showCustomizationPanels"
  );

  useEffect(() => {
    if (showCustomizationPanelsQuery === "true")
      setShowCustomizationPanels(true);
  }, [showCustomizationPanelsQuery]);

  const [showCustomizationPanels, setShowCustomizationPanels] = useState(false);

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
          abilityIds: abilitiesValue.map((item) => parseInt(item)),
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

  const PushQueries = (key: string, value: string[] | string) => {
    const searchParams = new URLSearchParams(location.search);

    const keyValuePairs = {
      [key]: Array.isArray(value) ? value.join(",") : value,
    };

    // Update the search parameters with the new key-value pairs
    Object.entries(keyValuePairs).forEach(([key, value]) => {
      searchParams.set(key, value);
    });

    // Construct the new search string
    const newSearch = searchParams.toString();

    // Replace the current URL without reloading the page
    navigate({
      search: newSearch,
    });
  };

  const handleShowPanelChange = (cateogry: string, status: boolean) => {
    setShownPanels((panels) => {
      const newState = status
        ? [...panels, cateogry]
        : panels.filter((item) => item !== cateogry);

      return newState;
    });
  };

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
