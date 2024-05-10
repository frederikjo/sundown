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
  console.log(userMissions, missionData);

  return (
    <div className="flex flex-col gap-4">
      {userMissions.length > 0 && (
        <ul className="border rounded shadow-md">
          {userMissions.map((mission) => {
            return (
              <li
                key={mission.id}
                className="hover:opacity-50 flex items-center justify-between p-4 border-b cursor-pointer"
              >
                <h2>{mission.missionName}</h2>

                <Link href={`/edit-mission?id=${mission.id}`}>
                  <Button>Edit</Button>
                </Link>
              </li>
            );
          })}
        </ul>
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
