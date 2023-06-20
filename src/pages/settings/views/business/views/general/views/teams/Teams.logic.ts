import { useMemo, useState } from "react";
import { useTeams } from "./hooks/useTeams";
import { useSelectedOrganiztion } from "@/global/states/selectedOrganizations";
import { useOrganiaztion } from "@/shared/hooks/graphql/queries/useOrganization/useOrganization";
import { useDeleteUserMutation } from "./hooks/useDeleteUserMutation";
import * as yup from "yup";
import { useAddOwnerMutation } from "./hooks/useAddOwnerMutation";
import { useUpdateMemberutation } from "./hooks/useUpdateMember";

export const useLogic = () => {
  const { data: data } = useTeams({ first: 1000, page: 1 });

  const [mutateAddOwner, { loading: loadingAddOwner }] = useAddOwnerMutation();

  const [mutateUpdateUser, { loading: loadingUpdateUser }] =
    useUpdateMemberutation();

  const [memberIdToDelete, setMemberIdToDelete] = useState<
    undefined | number
  >();

  const [memberIdToDeactivate, setMemberIdTDeactivate] = useState<
    undefined | number
  >();

  const [addOwnerEmail, setAddOwnerEmail] = useState("");

  const handleSetMemberToDelete = (id: number) => setMemberIdToDelete(id);

  const handleSetMemberToDeactivate = (id: number) =>
    setMemberIdTDeactivate(id);

  const memberToDeleteInfo = useMemo(
    () => data?.users.data.find((item) => item.id === memberIdToDelete),
    [memberIdToDelete, data]
  );

  const memberToDeactivateInfo = useMemo(
    () => data?.users.data.find((item) => item.id === memberIdToDeactivate),
    [memberIdToDeactivate, data]
  );

  const selectedOrgId = useSelectedOrganiztion((state) => state.id);

  const { data: organization } = useOrganiaztion({ id: selectedOrgId });

  const handleCancelDelete = () => setMemberIdToDelete(undefined);

  const handleCancelDeactivate = () => setMemberIdTDeactivate(undefined);

  const [mutateDeleteUser, { loading: loadingDeleting }] =
    useDeleteUserMutation();

  const handleConfirmDeleteUser = () => {
    memberIdToDelete &&
      mutateDeleteUser({
        variables: { id: parseInt(memberIdToDelete.toString()) },
      }).then(() => setMemberIdToDelete(undefined));
  };

  const handleConfirmDeactivateUser = () => {
    memberIdToDeactivate &&
      mutateUpdateUser({
        variables: {
          id: parseInt(memberIdToDeactivate.toString()),
          isActive: false,
        },
      }).then(() => setMemberIdTDeactivate(undefined));
  };

  const handleActivateMember = (id: number) =>
    mutateUpdateUser({
      variables: {
        id: parseInt(id.toString()),
        isActive: true,
      },
    });

  const [showAddOwnerDialog, setShowAddOwnerDialog] = useState(false);

  const handleShowAddOwner = () => setShowAddOwnerDialog(true);

  const handleCancelAddOwner = () => setShowAddOwnerDialog(false);

  const handleConfirmAddOwner = () => {
    mutateAddOwner({ variables: { email: addOwnerEmail } }).then(() => {
      setShowAddOwnerDialog(false);
      setAddOwnerEmail("");
    });
  };

  const handleEmailChange = (value: string) => setAddOwnerEmail(value);

  const isOwnerEmailValid = yup
    .string()
    .email("Invalid email")
    .required("Email is required")
    .isValidSync(addOwnerEmail);

  return {
    data,
    memberIdToDelete,
    handleSetMemberToDelete,
    memberToDeleteInfo,
    organization,
    handleCancelDelete,
    handleConfirmDeleteUser,
    loadingDeleting,
    showAddOwnerDialog,
    handleShowAddOwner,
    handleCancelAddOwner,
    addOwnerEmail,
    handleConfirmAddOwner,
    handleEmailChange,
    isOwnerEmailValid,
    loadingAddOwner,
    handleSetMemberToDeactivate,
    memberIdToDeactivate,
    handleCancelDeactivate,
    memberToDeactivateInfo,
    handleConfirmDeactivateUser,
    loadingUpdateUser,
    handleActivateMember,
  };
};
