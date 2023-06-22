import { create } from "zustand";

interface DeactivateMemberStoreState {
  id: number | undefined;
  setId: (id: number) => void;
  clear: () => void;
}

export const useDeactivateMemberStore = create<DeactivateMemberStoreState>(
  (set) => ({
    id: undefined,
    setId: (id: number) => set(() => ({ id })),
    clear: () => set(() => ({ id: undefined })),
  })
);
