import React from "react";
import { useUser } from "@/UserContext";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { SpaceReportType } from "./SpaceReport/FinaliseReport";
import { useStore } from "@/stores/spaceReportsStore";

const SpaceReports: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const { missionData, deleteMission } = useStore() as {
    missionData: SpaceReportType[];
    deleteMission: (id: string) => void;
  };

  const userMissions = missionData.filter(
    (mission) => mission.userId === user?.id
  );

  const handleCreateSpaceReport = () => {
    router.push("/create-space-report");
  };

  const handleDeleteMission = (id: string) => {
    deleteMission(id);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[420px]">
      {userMissions.length > 0 && (
        <div className="bg-starry w-full bg-gray-200 border rounded shadow-md">
          {userMissions.map((mission) => {
            return (
              <div
                key={mission.id}
                className="flex items-center justify-between p-2 p-4 border-b cursor-pointer"
              >
                <h2 className="line-clamp-1">
                  {mission.missionName}
                </h2>
                <div>
                  <Link
                    href={`/edit-space-report?id=${mission.id}`}
                    key={mission.id}
                    className="hover:opacity-60"
                  >
                    <Button className="hover:opacity-6">Edit</Button>
                  </Link>
                  <Button
                    onClick={() =>
                      handleDeleteMission(mission?.id ?? "")
                    }
                    className="hover:opacity-60"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Button onClick={handleCreateSpaceReport}>
        {userMissions.length > 0
          ? "Create a new report"
          : "Create your first report"}
      </Button>
    </div>
  );
};

export default SpaceReports;
