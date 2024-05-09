// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { Button } from "@mui/material";
import SpaceReports from "./SpaceReports";

interface SpaceReport {
  id: number;
  title: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const { user } = useUser();
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
    const newReport = {
      id: Math.floor(Math.random() * 1000),
      title: "New Space Report",
      description: "Description of the new space report",
    };

    const updatedReports = [...spaceReports, newReport];
    setSpaceReports(updatedReports);
    localStorage.setItem(
      `spaceReports_${user?.id}`,
      JSON.stringify(updatedReports)
    );
  };

  return (
    <div>
      <h2>Welcome, {user?.first_name}!</h2>
      <h3>Space Reports</h3>
      <SpaceReports />
    </div>
  );
};

export default Dashboard;
