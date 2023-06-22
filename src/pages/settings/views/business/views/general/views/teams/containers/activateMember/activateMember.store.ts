import { create } from "zustand";

interface ActivateMemberStoreState {
  id: number | undefined;
  setId: (id: number) => void;
  clear: () => void;
}

export const useActivateMemberStore = create<ActivateMemberStoreState>(
  (set) => ({
    id: undefined,
    setId: (id: number) => set(() => ({ id })),
    clear: () => set(() => ({ id: undefined })),
  })
);
