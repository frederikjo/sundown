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
  const { missionData } = useStore() as {
    missionData: SpaceReportType[];
  };

  const userMissions = missionData.filter(
    (mission) => mission.userId === user?.id
  );

  const handleCreateSpaceReport = () => {
    router.push("/create-space-report");
  };

  return (
    <div className="flex flex-col gap-4 max-w-[350px]">
      {userMissions.length > 0 && (
        <div className="bg-starry bg-gray-200 border rounded shadow-md">
          {userMissions.map((mission) => {
            return (
              <Link
                href={`/edit-space-report?id=${mission.id}`}
                key={mission.id}
                className="hover:opacity-60 flex items-center justify-between p-2 p-4 border-b cursor-pointer"
              >
                <h2 className="line-clamp-1">
                  {mission.missionName}
                </h2>
                <div>Edit</div>
              </Link>
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
