import { useAddOwnerStore } from "./containers/addOwner/addOwner.store";

export const useLogic = () => {
  const openAddOwner = useAddOwnerStore((state) => state.Open);

  const handleShowAddOwner = () => openAddOwner();

  return {
    handleShowAddOwner,
  };
};
