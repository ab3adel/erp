import { create } from "zustand";

interface RemoveMemberStoreState {
  id: number | undefined;
  setId: (id: number) => void;
  clear: () => void;
}

export const useRemoveMemberStore = create<RemoveMemberStoreState>((set) => ({
  id: undefined,
  setId: (id: number) => set(() => ({ id })),
  clear: () => set(() => ({ id: undefined })),
}));
