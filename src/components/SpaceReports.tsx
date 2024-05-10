import React, { useEffect, useState } from "react";
import { useUser } from "@/UserContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

interface SpaceReport {
  id: number;
  title: string;
  description: string;
}

const SpaceReports: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [spaceReports, setSpaceReports] = useState<SpaceReport[]>([]);

  useEffect(() => {
    const storedReports = localStorage.getItem(
      `spaceReports_${user?.id}`
    );
    if (storedReports) {
      setSpaceReports(JSON.parse(storedReports));
    }
  }, [user]);

  const handleCreateSpaceReport = () => {
    router.push("/create-space-report");
    //   const newReport = {
    //     id: Math.floor(Math.random() * 1000),
    //     title: "New Space Report",
    //     description: "Description of the new space report",
    //   };

    //   const updatedReports = [...spaceReports, newReport];
    //   setSpaceReports(updatedReports);
    //   localStorage.setItem(
    //     `spaceReports_${user?.id}`,
    //     JSON.stringify(updatedReports)
    //   );
    // };
  };

  return (
    <div>
      {/* <ul>
        {spaceReports?.map((report) => (
          <li key={report.id}>
            <strong>{report.title}</strong>: {report.description}
          </li>
        ))}
      </ul> */}
      <Button onClick={handleCreateSpaceReport}>
        Create New Space Report
      </Button>
    </div>
  );
};

export default SpaceReports;
