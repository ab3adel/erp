import { create } from "zustand";

interface ISelectedOrganiztion {
  id: number;
  set: (id: number) => void;
}

interface ISelectedOrganiztionTenentId {
  id: string;
  set: (id: string) => void;
}

export const useSelectedOrganiztion = create<ISelectedOrganiztion>((set) => ({
  id: 0,
  set: (id: number) => set(() => ({ id })),
}));

export const useSelectedTenentId = create<ISelectedOrganiztionTenentId>(
  (set) => ({
    id: "test",
    set: (id: string) => set(() => ({ id })),
  })
);
