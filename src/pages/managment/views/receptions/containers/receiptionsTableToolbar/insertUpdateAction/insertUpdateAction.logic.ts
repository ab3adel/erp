import { useCheckMode } from "../../../hooks/useCheckMode";

export const useLogic = () => {
  const { isInEditMode } = useCheckMode();

  return { isInEditMode };
};
