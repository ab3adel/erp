import { create } from "zustand";

interface DeleteLotsStoreState {
  idList: number[];
  clearList: () => void;
  addId: (id: number) => void;
  removeId: (id: number) => void;
}

export const useAddOwnerStore = create<DeleteLotsStoreState>((set) => ({
  idList: [8],
  clearList: () => set(() => ({ idList: [] })),
  addId: (id) => set((state) => ({ idList: [...state.idList, id] })),
  removeId: (id) =>
    set((state) => ({ idList: state.idList.filter((item) => item !== id) })),
}));
