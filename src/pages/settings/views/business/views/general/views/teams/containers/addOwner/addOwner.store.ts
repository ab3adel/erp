import { create } from "zustand";

interface AddOwnerStoreState {
  isOpen: boolean;
  Open: () => void;
  Close: () => void;
}

export const useAddOwnerStore = create<AddOwnerStoreState>((set) => ({
  isOpen: false,
  Open: () => set(() => ({ isOpen: true })),
  Close: () => set(() => ({ isOpen: false })),
}));
