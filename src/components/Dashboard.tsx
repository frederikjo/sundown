// Dashboard.tsx
import React, { useEffect } from "react";
import { useUser } from "../UserContext";
import SpaceReports from "./SpaceReports";
import { useStore } from "@/stores/spaceReportsStore";
import { SpaceReportType } from "./SpaceReport/FinaliseReport";
import Image from "next/image";
import { useRouter } from "next/router";

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();

  const { toastMessage, ...restQuery } = router.query;

  const { missionData } = useStore() as {
    missionData: SpaceReportType[];
  };

  const userMissions = missionData.filter(
    (mission) => mission.userId === user?.id
  );

  useEffect(() => {
    if (typeof toastMessage === "string") {
      const timeoutId = setTimeout(() => {
        const { toastMessage, ...restQuery } = router.query;
        router.replace(
          {
            pathname: router.pathname,
            query: restQuery,
          },
          undefined,
          { scroll: false }
        );
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [restQuery, router, toastMessage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 m-auto text-center">
      <div>
        {user && (
          <div className="flex flex-col items-center gap-4">
            <Image
              src={user?.avatar}
              width="100"
              height="100"
              alt={user?.username ?? "user avatar"}
            />
            <h1 className="text-xl">Welcome, {user?.first_name}!</h1>
          </div>
        )}
        {userMissions.length > 0 && (
          <div className="text-sm">Click on a report to edit</div>
        )}
      </div>
      {toastMessage && (
        <span className="text-green-500">{toastMessage}</span>
      )}
      <SpaceReports />
    </div>
  );
};

export default Dashboard;
