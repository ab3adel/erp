import { create } from "zustand";

export const useSelectRangeDateLogic = ({
  startdate,
  endDate,
}: {
  startdate: Date;
  endDate: Date | null;
}) => {
  type dateState = [string | null, string | null] | undefined;

  const useRangeDateState = create<{
    dateState: dateState;
    setDateState: (
      newValue: dateState
    ) => void;
  }>((set) => ({
    dateState: [startdate?.toString(), endDate ? endDate?.toString() : ""],
    setDateState: (newValue) => set({ dateState: newValue })
  }));

  return { useRangeDateState };
};
