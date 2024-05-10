import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { create as createZustandStore } from "zustand";
import { SetStateAction } from "react";
import { Dayjs } from "dayjs";

type State = {
  spaceReport: {
    missionName: string;
    missionDescription: string;
    missionDate: Dayjs | null | undefined;
    selectedImages: string[];
    setMissionName: (name: string) => void;
    setMissionDescription: (description: string) => void;
    setMissionDate: (date: Dayjs | null | undefined) => void;
    setSelectedImages: (images: string[]) => void;
  };
  setSpaceReport: (update: Partial<State["spaceReport"]>) => void;
};

const initialState: State = {
  spaceReport: {
    selectedImages: [],
    missionName: "",
    missionDescription: "",
    missionDate: null,
    setMissionName: () => {},
    setMissionDescription: () => {},
    setMissionDate: () => {},
    setSelectedImages: () => {},
  },
  setSpaceReport: () => {},
};

const localStorageKey = "spaceReportsStore";

export const useStore = createZustandStore<State>(
  persist<State>(
    (set) => ({
      ...initialState,
      setSpaceReport: (update) =>
        set((state) => ({
          ...state,
          spaceReport: { ...state.spaceReport, ...update },
        })),
    }),
    {
      name: localStorageKey,
      getStorage: () => localStorage,
    }
  ) as StateCreator<State>
);
