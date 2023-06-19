import { create } from "zustand";

interface ISelectedOrganiztion {
  id: number;
  set: (id: number) => void;
}

export const useSelectedOrganiztion = create<ISelectedOrganiztion>((set) => ({
  id: 0,
  set: (id: number) => set(() => ({ id })),
}));
