import { SpaceReportType } from "@/components/SpaceReport/FinaliseReport";
import { create as createZustandStore } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

type State = {
  missionData: SpaceReportType[];
  addMissionData: (data: SpaceReportType) => void;
  updateMission: (data: SpaceReportType) => void;
  deleteMission: (id: string) => void;
};

export const useStore = createZustandStore(
  persist(
    (set) => ({
      missionData: [],
      addMissionData: (data: SpaceReportType) =>
        set((state: State) => ({
          missionData: [
            ...state.missionData,
            { ...data, id: uuidv4() },
          ],
        })),
      updateMission: (data: SpaceReportType) =>
        set((state: State) => ({
          missionData: state.missionData.map((mission) =>
            mission.id === data.id ? data : mission
          ),
        })),
      deleteMission: (id: string) =>
        set((state: State) => ({
          missionData: state.missionData.filter(
            (mission) => mission.id !== id
          ),
        })),
    }),
    {
      name: "missionDataStorage",
      getStorage: () => localStorage,
    }
  )
);
