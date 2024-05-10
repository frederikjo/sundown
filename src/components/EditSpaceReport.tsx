import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "@/stores/spaceReportsStore";
import { SpaceReportType } from "./SpaceReport/FinaliseReport";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Image from "next/image";
import dayjs, { Dayjs } from "dayjs";
import SpaceMissionImages from "./SpaceReport/SpaceMissionImages";

const EditSpaceReport: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { missionData, updateMission } = useStore() as {
    missionData: SpaceReportType[];
    updateMission: (mission: SpaceReportType) => void;
  };
  const [mission, setMission] = useState<SpaceReportType | null>(
    null
  );
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (mission)
        setMission({
          ...mission,
          [event.target.name]: event.target.value,
        });
    },
    [mission]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (mission) {
        updateMission({
          ...mission,
          selectedImages: selectedImages,
        });
        router.push({
          pathname: "/dashboard",
          query: {
            toastMessage: `${mission?.missionName} updated successfully`,
          },
        });
      }
    },
    [mission, router, selectedImages, updateMission]
  );

  useEffect(() => {
    if (id) {
      const foundMission = missionData.find(
        (mission) => mission.id === id
      );
      if (foundMission) {
        setMission(foundMission);
      }
    }
  }, [id, missionData]);

  if (!mission) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 px-6">
      <h1>Edit Mission</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-col items-center gap-4">
          <div>
            <TextField
              name="missionName"
              label="Mission Name"
              value={mission?.missionName}
              fullWidth
              onChange={handleChange}
              required
              margin="normal"
            />

            <TextField
              name="missionDescription"
              label="Mission Description"
              value={mission?.missionDescription}
              fullWidth
              required
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              label="Latitude"
              value={mission?.lat}
              fullWidth
              disabled
              margin="normal"
            />
            <TextField
              label="Longitude"
              value={mission?.long}
              fullWidth
              disabled
              margin="normal"
            />
          </div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Mission Date"
              format="DD/MM/YYYY"
              value={
                mission.missionDate
                  ? dayjs(mission.missionDate)
                  : null
              }
              onChange={(newValue: Dayjs | null) => {
                setMission({
                  ...mission,
                  missionDate: newValue ? dayjs(newValue) : null,
                });
              }}
            />
          </LocalizationProvider>
          <div>
            <SpaceMissionImages
              onSelect={setSelectedImages}
              initialImages={mission?.selectedImages}
            />
          </div>
        </div>
        <Button type="submit">Update Mission</Button>
      </form>
    </div>
  );
};

export default EditSpaceReport;
