import { create } from "zustand";

interface ApprovePendingLotsStoreState {
  idList: number[];
  clearList: () => void;
  addId: (id: number) => void;
  removeId: (id: number) => void;
}

export const useApprovePendingLotsStore = create<ApprovePendingLotsStoreState>(
  (set) => ({
    idList: [5, 6],
    clearList: () => set(() => ({ idList: [] })),
    addId: (id) => set((state) => ({ idList: [...state.idList, id] })),
    removeId: (id) =>
      set((state) => ({ idList: state.idList.filter((item) => item !== id) })),
  })
);
