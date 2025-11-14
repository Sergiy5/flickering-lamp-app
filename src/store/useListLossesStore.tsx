import { create } from 'zustand';

interface ListLossesStore {
  data: any[];
  setData: (data: any[]) => void;
}

export const useListLossesStore = create<ListLossesStore>(set => ({
  data: [],
  setData: data => set({ data: data }),
}));
