import { create } from "zustand";

interface DeleteLotsStoreState {
  idList: number[];
  clearList: () => void;
  addId: (id: number) => void;
  removeId: (id: number) => void;
  setIdList: (idList: number[]) => void;
}

export const useDeletePendingLotsStore = create<DeleteLotsStoreState>(
  (set) => ({
    idList: [],
    clearList: () => set(() => ({ idList: [] })),
    addId: (id) => set((state) => ({ idList: [...state.idList, id] })),
    removeId: (id) =>
      set((state) => ({ idList: state.idList.filter((item) => item !== id) })),
    setIdList: (idList) => set(() => ({ idList })),
  })
);
